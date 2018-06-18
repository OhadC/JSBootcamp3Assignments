export interface ITreeItem {
    groupId: string
    type: "user" | "group"
    name: string
    items?: ITreeItem[]
}
