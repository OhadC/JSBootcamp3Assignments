import { IGroup, IUser } from "../../models"
import { actionTypes } from "../actions"

export interface IGlobalState {
    activeGroup: IGroup | null
    user: IUser | null
}

const initialState: IGlobalState = {
    activeGroup: null,
    user: null
}

const setActiveGroup = (state: IGlobalState, action: any): IGlobalState => ({
    ...state,
    activeGroup: action.payload.group
})

const setUser = (state: IGlobalState, action: any): IGlobalState => ({
    ...state,
    user: action.payload.user
})

const logout = (state: IGlobalState, action: any): IGlobalState => initialState

export const globalReducer = (state: IGlobalState = initialState, action: any): IGlobalState => {
    switch (action.type) {
        case (actionTypes.SET_ACTIVE_GROUP): return setActiveGroup(state, action)
        case (actionTypes.SET_USER): return setUser(state, action)
        case (actionTypes.LOGOUT): return logout(state, action)
        default: return state
    }
}
