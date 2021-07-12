import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";
export declare class UserScalarWhereWithAggregatesInput {
    AND?: UserScalarWhereWithAggregatesInput[] | undefined;
    OR?: UserScalarWhereWithAggregatesInput[] | undefined;
    NOT?: UserScalarWhereWithAggregatesInput[] | undefined;
    id?: StringWithAggregatesFilter | undefined;
    username?: StringWithAggregatesFilter | undefined;
    avatar?: StringWithAggregatesFilter | undefined;
    email?: StringNullableWithAggregatesFilter | undefined;
    discord_user_id?: StringNullableWithAggregatesFilter | undefined;
}
