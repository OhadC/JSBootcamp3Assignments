import * as _ from 'lodash'

import { actionTypes } from '../../store/actions'
import { IClientGroup } from "../../models"
import { apiRequest } from "."


export const fetchGroups = () => apiRequest({
    url: '/group',
    method: 'GET',
    label: 'fetchGroups'
})

export const fetchAllGroups = () => apiRequest({
    url: '/group', // TODO: all
    method: 'GET',
    label: 'fetchAllGroups'
})

export const setGroups = (groups: IClientGroup[]) => ({
    type: actionTypes.SET_GROUPS,
    payload: groups
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
    const success = () => {
        const { groups: { data: groups } } = getState()
        const groupsMap = _.mapKeys(groups, 'id')
        deleteGroupRecursively(group)
        dispatch(setGroups(_.values(groupsMap)))

        function deleteGroupRecursively(groupToDelete: IClientGroup) {
            delete groupsMap[groupToDelete.id]
            _.forEach(groupsMap, group => {
                if (group && group.parentId === groupToDelete.id) {
                    deleteGroupRecursively(group)
                }
            })
        }
    }
    dispatch(apiRequest({
        url: `/group/${group.id}`,
        method: 'DELETE',
        success
    }))
}
