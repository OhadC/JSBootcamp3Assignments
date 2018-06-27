// import { AnyAction } from "redux"

// import { actionTypes } from "."
import * as actions from '../../store/actions'
import { IClientUser, IClientGroup } from "../../models"

export const deleteUser = (user: IClientUser) => (dispatch: any, getState: Function) => {
    const success = () => {
        const { items } = getState().tree
        const userIndex = (items as IClientUser[]).findIndex(item => item.id === user.id)
        const newItems = items.slice()
        newItems.splice(userIndex, 1)
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
        const { items } = getState().tree
        const groupIndex = (items as IClientGroup[]).findIndex(item => item.id === group.id)
        const newItems = items.slice()
        newItems.splice(groupIndex, 1)
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/group/${group.id}`,
        method: 'DELETE',
        success
    }))
}
