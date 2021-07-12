import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
export declare class UserUpdateInput {
    id?: StringFieldUpdateOperationsInput | undefined;
    username?: StringFieldUpdateOperationsInput | undefined;
    avatar?: StringFieldUpdateOperationsInput | undefined;
    email?: NullableStringFieldUpdateOperationsInput | undefined;
    discord_user_id?: NullableStringFieldUpdateOperationsInput | undefined;
}
