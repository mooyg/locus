import { UserOrderByInput } from "../../../inputs/UserOrderByInput";
import { UserScalarWhereWithAggregatesInput } from "../../../inputs/UserScalarWhereWithAggregatesInput";
import { UserWhereInput } from "../../../inputs/UserWhereInput";
export declare class GroupByUserArgs {
    where?: UserWhereInput | undefined;
    orderBy?: UserOrderByInput[] | undefined;
    by: Array<"id" | "username" | "avatar" | "email" | "discord_user_id">;
    having?: UserScalarWhereWithAggregatesInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
}