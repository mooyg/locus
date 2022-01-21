import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class UserResolver {
  @Query(() => String)
  dummy() {
    return 'dumm'
  }
}
