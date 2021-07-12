import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
export declare class UserWhereInput {
    AND?: UserWhereInput[] | undefined;
    OR?: UserWhereInput[] | undefined;
    NOT?: UserWhereInput[] | undefined;
    id?: StringFilter | undefined;
    username?: StringFilter | undefined;
    avatar?: StringFilter | undefined;
    email?: StringNullableFilter | undefined;
    discord_user_id?: StringNullableFilter | undefined;
}
