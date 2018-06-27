import { actionTypes } from "../actions"

import { createReducer } from "../utility"
import { IClientGroup, IClientUser } from "../../models";

export interface IAdminlState {
    editMode: 'groups' | 'users'
    items: IClientGroup[] | IClientUser[] | null
}

const initialState: IAdminlState = {
    editMode: 'groups',
    items: [],
}

const logout = (): IAdminlState => initialState

export const adminReducer = createReducer(initialState, {
    [actionTypes.LOGOUT]: logout
})
