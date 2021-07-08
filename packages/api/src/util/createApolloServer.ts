import { ApolloServer } from 'apollo-server-express';
import { createSchema } from '@util/createSchema';
import { PrismaClient } from '@prisma/client';

export const createApolloServer = async (
  db: PrismaClient
): Promise<ApolloServer> => {
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => {
      return {
        req,
        res,
        prisma: db,
      };
    },
  });
  return apolloServer;
};
