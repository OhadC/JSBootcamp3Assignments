import { IClientGroup } from "./group"
import { IItemHTMLElement } from "../containers/Tree/chat-tree"

export interface ITreeItem {
    group: IClientGroup
    type: "user" | "group"
    name: string
    items?: ITreeItem[],
    HTMLElement?: IItemHTMLElement
}
