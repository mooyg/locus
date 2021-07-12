/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '.prisma/client';

export interface Context {
  prisma?: PrismaClient;
  req?: any;
  res?: any;
}
