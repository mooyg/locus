import { Router } from 'express';
import { discordOauth } from './Strategy/discord';
import { PassportStatic } from 'passport';
import { PrismaClient } from '@prisma/client';

export const initializeAuthRoutes = (
  passport: PassportStatic,
  prisma: PrismaClient
): Router => {
  const authRouter = Router();

  authRouter.use('/discord', discordOauth(passport, prisma));
  authRouter.use('/me', (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.send(req.user);
    } else {
      res.redirect(
        process.env.NODE_ENV
          ? `${process.env.CLIENT_URL}/login`
          : 'http://localhost:3000'
      );
    }
  });
  return authRouter;
};
