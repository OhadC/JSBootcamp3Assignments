import { actionTypes } from '../../store/actions'
import { IClientGroup } from "../../models"

export const fetchGroups = (payload?: any, status?: string) => ({
    type: actionTypes.FETCH_GROUPS,
    status: actionTypes.getStatus(payload, status),
    payload
})

export const fetchAllGroups = (payload?: any, status?: string) => ({
    type: actionTypes.FETCH_ALL_GROUPS,
    status: actionTypes.getStatus(payload, status),
    payload
})

export const addGroup = (payload?: any, status?: string) => ({
    type: actionTypes.ADD_GROUP,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const addGroupRequest = (group: IClientGroup) => addGroup({ group }, actionTypes.REQUEST)

export const updateGroup = (payload?: any, status?: string) => ({
    type: actionTypes.UPDATE_GROUP,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const updateGroupRequest = (updatedGroupFields: IClientGroup) => updateGroup({ updatedGroupFields }, actionTypes.REQUEST)

export const deleteGroup = (payload?: any, status?: string) => ({
    type: actionTypes.DELETE_GROUP,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const deleteGroupRequest = (group: IClientGroup) => deleteGroup({ group }, actionTypes.REQUEST)
