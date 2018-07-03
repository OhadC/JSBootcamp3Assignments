import * as actions from '../../store/actions'
import { IClientUser, IUser } from "../../models"
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
    const success = () => dispatch({
        type: actionTypes.DELETE_USER,
        payload: { user }
    })
    dispatch(actions.apiRequest({
        url: `/user/${user.id}`,
        method: 'DELETE',
        success
    }))
}
