import { Dispatch } from "redux"

import { IGroup, IUser } from "../../models"
import { actionTypes } from "."

export const setActiveGroup = (group: IGroup) => ({
    type: actionTypes.SET_ACTIVE_GROUP,
    payload: { group }
})

export const setUser = (user: IUser) => ({
    type: actionTypes.SET_USER,
    payload: { user }
})

export const fetchUser = (userId: string) => (dispatch: Dispatch) => {
    dispatch({
        type: actionTypes.API,
        payload: {
            url: `/user/${userId}`,
            success: setUser
        }
    })
}

export const setActiveGroupId = (groupId: string) => (dispatch: Dispatch) => {
    dispatch({
        type: actionTypes.API,
        payload: {
            url: `/group/${groupId}`,
            success: setActiveGroup
        }
    })
}
