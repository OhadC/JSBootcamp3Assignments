import { actionTypes } from "../actions"
import { ITreeItem, IClientGroup } from "../../models"
import { updateObject, createReducer } from "../utility"

export interface ITreeState {
    activeGroup: IClientGroup | null
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

const setTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        activeGroup: action.payload.tree[0].group,
        tree: action.payload.tree,
        filteredTree: action.payload.tree
    }
    return updateObject(state, newValues)
}

const setFilteredTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        filterText: action.payload.filterText,
        filteredTree: action.payload.filteredTree,
    }
    return updateObject(state, newValues)
}

const logout = (state: ITreeState): ITreeState => initialState

export const treeReducer = createReducer(initialState, {
    [actionTypes.SET_TREE]: setTree,
    [actionTypes.SET_FILTERED_TREE]: setFilteredTree,
    [actionTypes.LOGOUT]: logout
})
