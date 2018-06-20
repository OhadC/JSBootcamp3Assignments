import { actionTypes } from "../actions"
import { ITreeItem, IGroup } from "../../models";

export interface ITreeState {
    activeGroup: IGroup | null
    tree: ITreeItem[]
    filterText: string
    filteredTree: Array<ITreeItem>
}

const initialState: ITreeState = {
    activeGroup: null,
    tree: [],
    filterText: '',
    filteredTree: []
}

const setTree = (state: ITreeState, action: any): ITreeState => ({
    ...state,
    activeGroup: action.payload.tree[0].group,
    tree: action.payload.tree,
    filteredTree: action.payload.tree
})

const setFilteredTree = (state: ITreeState, action: any): ITreeState => ({
    ...state,
    filterText: action.payload.filterText,
    filteredTree: action.payload.filteredTree,
})

const logout = (state:  ITreeState): ITreeState => initialState

export const treeReducer = (state: ITreeState = initialState, action: any): ITreeState => {
    switch (action.type) {
        case (actionTypes.SET_TREE): return setTree(state, action)
        case (actionTypes.SET_FILTERED_TREE): return setFilteredTree(state, action)
        case (actionTypes.LOGOUT): return logout(state)
        default: return state
    }
}
