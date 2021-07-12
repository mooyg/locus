import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-discord';

export const discordOauth = (
  passport: PassportStatic,
  prisma: PrismaClient
): Router => {
  const discordAuthRouter = Router();
  const scope = ['identify', 'email', 'guilds', 'guilds.join'];

  passport.use(
    new Strategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.CLIENT_URL
          ? `${process.env.CLIENT_URL}/api/auth/discord/callback`
          : 'http://localhost:4000/api/auth/discord/callback',
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
  discordAuthRouter.get('/', passport.authenticate('discord'));
  discordAuthRouter.get(
    '/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (_req, res) => {
      res.redirect('http://localhost:3000');
    }
  );
  return discordAuthRouter;
};
