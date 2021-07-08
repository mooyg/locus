import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.ObjectType({
  isAbstract: true,
})
export class User {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  username!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  avatar!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  discord_user_id?: string | null;
}
