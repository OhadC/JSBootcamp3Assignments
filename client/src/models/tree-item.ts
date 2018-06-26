import { IClientGroup } from "./group";
import { IClientUser } from "./user";

export interface ITreeItem {
    group: IClientGroup | IClientUser
    type: 'user' | 'group'
    name: string
    items?: ITreeItem[]
}
