import { IGroup, IUser } from "../../models"
import { actionTypes } from "../actions"

interface IGlobalState {
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

export const globalReducer = (state: IGlobalState = initialState, action: any): IGlobalState => {
    switch(action.type) {
        case(actionTypes.SET_ACTIVE_GROUP): return setActiveGroup(state, action)
        default: return state
    }
}
