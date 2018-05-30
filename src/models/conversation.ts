import { IMessage } from "./message";
import { IUser } from "./user";

export interface IConversation {
    id: string
    ofType: "user" | "group"
    messages: IMessage[]    // should be Ids
    participants: IUser[]   // should be Ids
}
