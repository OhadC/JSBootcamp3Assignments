import { actionTypes } from "../actions"
import { ITreeItem, IClientGroup } from "../../models"
import { updateObject, createReducer } from "../utility"

export interface ITreeState {
    activeGroup: IClientGroup | null
    tree: ITreeItem[]
    filterText: string
    filteredTree: Array<ITreeItem>
    expandedGroupIds: string[]
}

const initialState: ITreeState = {
    activeGroup: null,
    tree: [],
    filterText: '',
    filteredTree: [],
    expandedGroupIds: []
}

const setTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        tree: action.payload.tree,
        filterText: '',
        filteredTree: action.payload.tree
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
        activeGroup: null,
        expandedGroupIds: []
    }
    return updateObject(state, newValues)
}

const setActiveGroup = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { activeGroup: action.payload.activeGroup })

const setExpandedGroupIds = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { expandedGroupIds: action.payload.expandedGroupIds })

const logout = (state: ITreeState): ITreeState => initialState

export const treeReducer = createReducer(initialState, {
    [actionTypes.SET_TREE]: setTree,
    [actionTypes.UPDATE_TREE]: updateTree,
    [actionTypes.SET_FILTERED_TREE]: setFilteredTree,
    [actionTypes.SET_ACTIVE_GROUP]: setActiveGroup,
    [actionTypes.SET_EXPANDED_GROUP_IDS]: setExpandedGroupIds,
    [actionTypes.LOGOUT]: logout
})
