import { actionTypes } from '../../store/actions'
import { IClientGroup } from "../../models"
import { apiRequest } from "."
import { getStatus } from './api';

export const fetchGroups = (payload: any, status?: string) => ({
    type: actionTypes.FETCH_GROUPS,
    status: getStatus(payload, status),
    payload
})

export const fetchAllGroups = (payload: any, status?: string) => ({
    type: actionTypes.FETCH_ALL_GROUPS,
    status: getStatus(payload, status),
    payload
})

export const addGroupRequest = (group: IClientGroup) => ({
    type: actionTypes.ADD_GROUP,
    status: actionTypes.REQUEST,
    payload: { group }
})

export const addGroup = (payload: any, status?: string) => ({
    type: actionTypes.ADD_GROUP,
    status: getStatus(payload, status),
    payload
})

// export const createNewGroup = (groupWithoutId: IClientGroup) => (dispatch: any, getState: Function) => {
//     dispatch(apiRequest({
//         url: `/group/`,
//         method: 'POST',
//         data: groupWithoutId,
//         success: (group: IClientGroup) => dispatch(addGroup(group)),
//     }))
// }

export const updateGroup = (updatedGroupFields: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = (group: IClientGroup) => dispatch({
        type: actionTypes.UPDATE_GROUP,
        payload: { group }
    })
    dispatch(apiRequest({
        url: `/group/${updatedGroupFields._id}`,
        method: 'PUT',
        data: updatedGroupFields,
        success,
    }))
}

export const deleteGroup = (group: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = () => dispatch({
        type: actionTypes.DELETE_GROUP,
        payload: { group }
    })
    dispatch(apiRequest({
        url: `/group/${group._id}`,
        method: 'DELETE',
        success
    }))
}
