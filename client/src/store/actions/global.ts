import { AnyAction } from "redux"

import { IGroup, IUser } from "../../models"
import { actionTypes, apiRequest } from "."

export const setActiveGroup = (group: IGroup): AnyAction => ({
    type: actionTypes.SET_ACTIVE_GROUP,
    payload: { group }
})

export const setUser = (user: IUser): AnyAction => ({
    type: actionTypes.SET_USER,
    payload: { user }
})

export const fetchUser = (userId: string): AnyAction =>
    apiRequest({
        url: `/user/${userId}`,
        success: setUser
    })

export const setActiveGroupId = (groupId: string): AnyAction =>
    apiRequest({
        url: `/group/${groupId}`,
        success: setActiveGroup
    })
