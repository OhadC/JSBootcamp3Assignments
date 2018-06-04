import { ITreeItem } from "../models/tree-item"

export interface ITreeState {
    activeItem: ITreeItem | null
    data: Array<ITreeItem>
    filterText: string
    filterdData: Array<ITreeItem>
}

export const treeInitialState: ITreeState = {
    activeItem: null,
    data: [],
    filterText: '',
    filterdData: []
}
