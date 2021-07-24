import { User as PrismaUser } from '@generated/type-graphql';
import express = require('express'); // Import namespace

// @types/express/index.d.ts

interface MyUser {
  id: string;
  avatar: string;
  discord_user_id: string;
  username: string;
}
// Now we can merge declarations
declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}
