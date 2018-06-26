import { actionTypes } from "../actions"
import { ITreeItem, IClientGroup, IClientUser } from "../../models"
import { updateObject, createReducer } from "../utility"

export interface ITreeState {
    itemsType: 'groups' | 'users'
    active: IClientGroup | IClientUser | null
    tree: ITreeItem[]
    filterText: string
    filteredTree: ITreeItem[]
    expandedIds: string[]
}

const initialState: ITreeState = {
    itemsType: 'groups',
    active: null,
    tree: [],
    filterText: '',
    filteredTree: [],
    expandedIds: []
}

const setTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        itemsType: action.payload.itemsType || state.itemsType,
        active: null,
        tree: action.payload.tree,
        filterText: '',
        filteredTree: action.payload.tree,
        expandedIds: []
    }
    return updateObject(state, newValues)
}

const setFilteredTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        filterText: action.payload.filterText,
        filteredTree: action.payload.filteredTree,
        // activeGroup: null,
        // expandedGroupIds: []
    }
    return updateObject(state, newValues)
}
const updateTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        tree: action.payload.tree,
        filterText: action.payload.filterText || state.filterText,
        filteredTree: action.payload.filteredTree,
    }
    return updateObject(state, newValues)
}

const setActive = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { active: action.payload.active })

const setExpandedIds = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { expandedIds: action.payload.expandedIds })

const logout = (state: ITreeState): ITreeState => initialState

export const treeReducer = createReducer(initialState, {
    [actionTypes.SET_TREE]: setTree,
    [actionTypes.UPDATE_TREE]: updateTree,
    [actionTypes.SET_FILTERED_TREE]: setFilteredTree,
    [actionTypes.SET_ACTIVE]: setActive,
    [actionTypes.SET_EXPANDED_IDS]: setExpandedIds,
    [actionTypes.LOGOUT]: logout
})
