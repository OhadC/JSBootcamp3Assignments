import { IClientGroup } from "./group";

export interface ITreeItem {
    group: IClientGroup
    type: "user" | "group"
    name: string
    items?: ITreeItem[]
}
