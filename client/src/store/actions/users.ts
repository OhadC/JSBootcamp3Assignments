import * as _ from 'lodash'

import * as actions from '../../store/actions'
import { IClientUser, IUser, IClientGroup } from "../../models"
import { actionTypes, apiRequest } from "."

export const fetchUsers = () => fetchAllUsers()

export const fetchAllUsers = () => apiRequest({
    url: '/user',       // TODO: all
    method: 'GET',
    label: 'fetchAllUsers'
})

export const setUsers = (users: IClientUser[]) => ({
    type: actionTypes.SET_USERS,
    payload: users
})

export const addUser = (user: IUser) => ({
    type: actionTypes.ADD_USER,
    payload: user
})

export const createNewUser = (userWithoutId: IClientUser) => (dispatch: any, getState: Function) => {
    dispatch(actions.apiRequest({
        url: `/user`,
        method: 'POST',
        data: userWithoutId,
        success: (user: IClientUser) => dispatch(addUser(user)),
    }))
}

export const updateUser = (updatedUserFields: IClientUser) => (dispatch: any, getState: Function) => {
    const success = (user: IClientUser) => dispatch({
        type: actionTypes.UPDATE_USER,
        payload: { user }
    })
    dispatch(actions.apiRequest({
        url: `/user/${updatedUserFields.id}`,
        method: 'PUT',
        data: updatedUserFields,
        success,
    }))
}

export const deleteUser = (user: IClientUser) => (dispatch: any, getState: Function) => {
    const success = () => {
        const { groups: { data: groups }, users: { data: users } } = getState()
        const newGroups: IClientGroup[] = groups.slice()
        const newUsers = _.differenceWith((users), [user], (a: any, b) => a.id === b.id)

        for (let i = newGroups.length - 1; i >= 0; i--) {
            const group = newGroups[i]
            if (group.userIds && _.includes(group.userIds, user.id)) {
                if (group.isPrivate) {
                    newGroups.splice(i, 1)
                } else {
                    const newGroup = Object.assign({}, group)
                    newGroup.userIds = _.difference(newGroup.userIds, [user.id])
                    newGroup.users = _.differenceWith(newGroup.users, [user], (a: any, b) => a.id === b.id)
                    newGroups[i] = newGroup
                }
            }
        }

        dispatch(setUsers(newUsers))
        dispatch(actions.setGroups(newGroups))
    }
    dispatch(actions.apiRequest({
        url: `/user/${user.id}`,
        method: 'DELETE',
        success
    }))
}
