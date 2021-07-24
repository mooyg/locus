import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-discord';

export const discordOauth = (
  passport: PassportStatic,
  prisma: PrismaClient
): Router => {
  console.log('INSIDE DISCORD OAUTH');
  const discordAuthRouter = Router();
  const scope = ['identify', 'email', 'guilds', 'guilds.join'];
  let callbackURL;
  let deviceType;
  if (process.env.NODE_ENV) {
    callbackURL = `${process.env.CLIENT_URL}/api/auth/discord/callback`;
  }

  passport.use(
    new Strategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL,
        scope,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        console.log(profile);
        const findUser = await prisma.user.findFirst({
          where: {
            email: profile.email,
          },
        });
        console.log(findUser);
        if (findUser) {
          console.log('Already exists');
          return done(null, findUser);
        }
        try {
          const discordUser = await prisma.user.create({
            data: {
              username: profile.username,
              email: profile.email,
              avatar: profile.avatar,
              discord_user_id: profile.id,
            },
          });
          return done(null, discordUser);
        } catch (e) {
          return done(e, undefined);
        }
      }
    )
  );
  discordAuthRouter.get(
    '/:device',
    passport.authenticate('discord'),
    (req, _res) => {
      console.log(req.params.device);
      deviceType = req.params.device;
      callbackURL =
        deviceType === 'mobileapp'
          ? 'http://10.0.2.2:4000/api/auth/discord/callback/mobile'
          : 'http://localhost:4000/api/auth/discord/callback/browser';
    }
  );
  discordAuthRouter.get(
    '/callback/mobile',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
      console.log('MOBILE APP HERE');
      if (!req.user) return;
      console.log(req.user.username);
      res.redirect(
        `exp://192.168.29.20:19000?username=${req.user.username}&id=${req.user.id}&avatar=${req.user.avatar}&email=${req.user.email}`
      );
    }
  );
  discordAuthRouter.get(
    '/callback/browser',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (_req, res) => {
      console.log('BROWSER HERE');
      res.redirect('http://localhost:3000');
    }
  );
  return discordAuthRouter;
};
