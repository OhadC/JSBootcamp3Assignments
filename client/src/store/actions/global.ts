import { AnyAction } from "redux"

import { IClientGroup, IClientUser } from "../../models"
import { actionTypes, apiRequest } from "."

export const setActiveGroup = (group: IClientGroup): AnyAction => ({
    type: actionTypes.SET_ACTIVE_GROUP,
    payload: { group }
})

export const setUser = (user: IClientUser): AnyAction => ({
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
