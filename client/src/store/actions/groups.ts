import { actionTypes } from '../../store/actions'
import { IClientGroup } from "../../models"
import { apiRequest } from "."

export const fetchGroups = () => apiRequest({
    url: '/group',
    method: 'GET',
    label: 'fetchGroups'
})

export const fetchAllGroups = () => apiRequest({
    url: '/group/all',
    method: 'GET',
    label: 'fetchAllGroups'
})

export const addGroup = (group: IClientGroup) => ({
    type: actionTypes.ADD_GROUP,
    payload: { group }
})

export const createNewGroup = (groupWithoutId: IClientGroup) => (dispatch: any, getState: Function) => {
    dispatch(apiRequest({
        url: `/group/`,
        method: 'POST',
        data: groupWithoutId,
        success: (group: IClientGroup) => dispatch(addGroup(group)),
    }))
}

export const updateGroup = (updatedGroupFields: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = (group: IClientGroup) => dispatch({
        type: actionTypes.UPDATE_GROUP,
        payload: { group }
    })
    dispatch(apiRequest({
        url: `/group/${updatedGroupFields.id}`,
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
        url: `/group/${group.id}`,
        method: 'DELETE',
        success
    }))
}
