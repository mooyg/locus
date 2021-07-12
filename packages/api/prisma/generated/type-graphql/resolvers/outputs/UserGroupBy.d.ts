import { UserCountAggregate } from "../outputs/UserCountAggregate";
import { UserMaxAggregate } from "../outputs/UserMaxAggregate";
import { UserMinAggregate } from "../outputs/UserMinAggregate";
export declare class UserGroupBy {
    id: string;
    username: string;
    avatar: string;
    email: string | null;
    discord_user_id: string | null;
    _count: UserCountAggregate | null;
    _min: UserMinAggregate | null;
    _max: UserMaxAggregate | null;
}
