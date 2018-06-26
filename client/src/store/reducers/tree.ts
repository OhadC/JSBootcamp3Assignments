import { actionTypes } from "../actions"
import { ITreeItem, IClientGroup, IClientUser } from "../../models"
import { updateObject, createReducer } from "../utility"

export interface ITreeState {
    itemsType: 'groups' | 'users'
    items: IClientGroup[] | IClientUser[]
    tree: ITreeItem[]
    filterText: string
    active: IClientGroup | IClientUser | null
    expandedIds: string[]
}

const initialState: ITreeState = {
    itemsType: 'groups',
    items: [],
    tree: [],
    filterText: '',
    active: null,
    expandedIds: []
}

const setTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        itemsType: action.payload.itemsType,
        items: action.payload.items,
        tree: action.payload.tree,
        active: null,
        filterText: '',
        expandedIds: []
    }
    return updateObject(state, newValues)
}

const updateTree = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        items: action.payload.items || state.items,
        tree: action.payload.tree,
        filterText: action.payload.filterText || state.filterText
    }
    return updateObject(state, newValues)
}
const updateTreeItems = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        items: action.payload.items,
        tree: action.payload.tree,
        filterText: action.payload.filterText || state.filterText
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
    [actionTypes.UPDATE_TREE_ITEMS]: updateTreeItems,
    [actionTypes.SET_ACTIVE]: setActive,
    [actionTypes.SET_EXPANDED_IDS]: setExpandedIds,
    [actionTypes.LOGOUT]: logout
})
