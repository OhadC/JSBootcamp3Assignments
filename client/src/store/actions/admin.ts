// import { AnyAction } from "redux"
import * as _ from 'lodash'

// import { actionTypes } from "."
import * as actions from '../../store/actions'
import { IClientUser, IClientGroup } from "../../models"

export const createNewUser = (userWithoutId: IClientUser) => (dispatch: any, getState: Function) => {
    const success = (newUser: IClientUser) => {
        const { items } = getState().tree
        const newItems = items.slice()
        newItems.push(newUser)
        dispatch(actions.addUser(newUser))
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/user`,
        method: 'POST',
        data: userWithoutId,
        success
    }))
}

export const updateUser = (updatedUserFields: IClientUser) => (dispatch: any, getState: Function) => {
    const success = (updatedUser: IClientGroup) => {
        const { items } = getState().tree
        const userIndex = (items as IClientGroup[]).findIndex(item => item.id === updatedUserFields.id)
        const newItems = items.slice()
        newItems[userIndex] = updatedUser
        dispatch(actions.setUsers(newItems))
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/user/${updatedUserFields.id}`,
        method: 'PUT',
        data: updatedUserFields,
        success,
    }))
}

export const deleteUser = (user: IClientUser) => (dispatch: any, getState: Function) => {
    const success = () => {
        const { items } = getState().tree
        const newItems = _.difference(items, [user])
        dispatch(actions.setUsers(newItems))
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/user/${user.id}`,
        method: 'DELETE',
        success
    }))
}

export const createNewGroup = (groupWithoutId: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = (newGroup: IClientGroup) => {
        const { items } = getState().tree
        const newItems = items.slice()
        newItems.push(newGroup)
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/group/`,
        method: 'POST',
        data: groupWithoutId,
        success,
    }))
}

export const updateGroup = (updatedGroupFields: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = (updatedGroup: IClientGroup) => {
        const { items } = getState().tree
        const groupIndex = (items as IClientGroup[]).findIndex(item => item.id === updatedGroupFields.id)
        const newItems = items.slice()
        newItems[groupIndex] = updatedGroup
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/group/${updatedGroupFields.id}`,
        method: 'PUT',
        data: updatedGroupFields,
        success,
    }))
}

export const deleteGroup = (group: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = () => {
        const { items: groups } = getState().tree
        const groupsMap = _.mapKeys(groups, 'id')
        deleteGroupRecursively(group)
        dispatch(actions.updateTreeItems(_.values(groupsMap)))

        function deleteGroupRecursively(groupToDelete: IClientGroup) {
            delete groupsMap[groupToDelete.id]
            _.forEach(groupsMap, group => {
                if (group && group.parentId === groupToDelete.id) {
                    deleteGroupRecursively(group)
                }
            })
        }
    }
    dispatch(actions.apiRequest({
        url: `/group/${group.id}`,
        method: 'DELETE',
        success
    }))
}
