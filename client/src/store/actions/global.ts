import { AnyAction } from "redux"

import { IClientGroup } from "../../models"
import { actionTypes, apiRequest } from "."

export const setActiveGroup = (group: IClientGroup): AnyAction => ({
    type: actionTypes.SET_ACTIVE_GROUP,
    payload: { group }
})

export const setActiveGroupId = (groupId: string): AnyAction =>
    apiRequest({
        url: `/group/${groupId}`,
        success: setActiveGroup
    })

export const socketLoginSuccess = (): AnyAction => ({
    type: actionTypes.SOCKET_LOGIN_SUCCESS
})
