interface ITreeItem {
    id: string
    type: string
    name: string
    items?: ITreeItem[]
}

export { ITreeItem }