import { Context } from '@context/context';
import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '@models/User';
@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Ctx() { req }: Context) {
    console.log('GET USER');
    console.log(req.user);
    if (!req.user) return null;
    return req.user;
  }
}
