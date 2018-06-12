export interface ITreeItem {
    id: string
    type: "user" | "group"
    name: string
    conversationId: string
    items?: ITreeItem[]
}
