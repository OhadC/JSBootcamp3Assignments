import { IGroup } from "./group";

export interface ITreeItem {
    group: IGroup
    type: "user" | "group"
    name: string
    items?: ITreeItem[]
}
