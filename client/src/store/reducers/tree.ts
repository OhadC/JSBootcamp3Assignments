import { actionTypes } from "../actions"
import { ITreeItem } from "../../models";

export interface ITreeState {
    activeGroupId: string
    tree: ITreeItem[]
    filterText: string
    filteredTree: Array<ITreeItem>
}

const initialState: ITreeState = {
    activeGroupId: "",
    tree: [],
    filterText: '',
    filteredTree: []
}

const setTree = (state: ITreeState, action: any): ITreeState => ({
    ...state,
    activeGroupId: action.payload.tree[0].groupId,
    tree: action.payload.tree,
    filteredTree: action.payload.tree
})

const setFilteredTree = (state: ITreeState, action: any): ITreeState => ({
    ...state,
    filterText: action.payload.filterText,
    filteredTree: action.payload.filteredTree,
})

export const treeReducer = (state: ITreeState = initialState, action: any): ITreeState => {
    switch (action.type) {
        case (actionTypes.SET_TREE): return setTree(state, action)
        case (actionTypes.SET_FILTERED_TREE): return setFilteredTree(state, action)
        default: return state
    }
}
