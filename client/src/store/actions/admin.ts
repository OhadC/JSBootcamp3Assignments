// import { AnyAction } from "redux"
import * as _ from 'lodash'

// import { actionTypes } from "."
import * as actions from '../../store/actions'
import { IClientUser, IClientGroup } from "../../models"

export const deleteUser = (user: IClientUser) => (dispatch: any, getState: Function) => {
    const success = () => {
        const { items } = getState().tree

        const newItems = _.difference(items, [user])    // that should work.
        // const userIndex = (items as IClientUser[]).findIndex(item => item.id === user.id)
        // const newItems = items.slice()
        // newItems.splice(userIndex, 1)
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/user/${user.id}`,
        method: 'DELETE',
        success
    }))
}

export const updateGroup = (group: IClientGroup) => (dispatch: any, getState: Function) => {
    const success = (updatedGroup: IClientGroup) => {
        const { items } = getState().tree
        const groupIndex = (items as IClientGroup[]).findIndex(item => item.id === group.id)
        const newItems = items.slice()
        newItems[groupIndex] = updatedGroup
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/group/${group.id}`,
        method: 'PUT',
        data: group,
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
