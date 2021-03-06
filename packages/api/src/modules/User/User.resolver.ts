import { Context } from '@context/context';
import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '@generated/type-graphql';
@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Ctx() { req }: Context): Promise<User | null> {
    console.log('GET USER');
    console.log(req.user);
    if (!req.user) return null;

    return req.user;
  }
  @Query(() => [User])
  async getAllUsers(@Ctx() { prisma }: Context): Promise<User[] | undefined> {
    return prisma?.user.findMany({});
  }
}
