import { actionTypes } from "../actions"
import { IClientGroup, IClientUser } from "../../models"
import { updateObject, createReducer } from "../utility"

export interface ITreeState {
    filterText: string
    active: IClientGroup | IClientUser | null
    forcedActive: IClientGroup | IClientUser | null
    expandedIds: string[]
}

const initialState: ITreeState = {
    filterText: '',
    active: null,
    forcedActive: null,
    expandedIds: []
}

const setTreeFilter = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { filterText: action.payload.filterText })

const setActive = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { active: action.payload.active, forcedActive: null })

const setForcedActive = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { forcedActive: action.payload.forcedActive })

const setExpandedIds = (state: ITreeState, action: any): ITreeState =>
    updateObject(state, { expandedIds: action.payload.expandedIds })

const logout = (state: ITreeState): ITreeState => initialState

export const treeReducer = createReducer(initialState, {
    [actionTypes.SET_TREE_FILTER]: setTreeFilter,
    [actionTypes.SET_ACTIVE]: setActive,
    [actionTypes.SET_FORCED_ACTIVE]: setForcedActive,
    [actionTypes.SET_EXPANDED_IDS]: setExpandedIds,
    [actionTypes.LOGOUT]: logout
})
