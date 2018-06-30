import { IClientUser, IUser } from "../../models"
import { actionTypes, apiRequest } from "."

export const fetchUsers = () => apiRequest({
    url: '/user',
    method: 'GET',
    label: 'fetchUsers'
})

export const setUsers = (users: IClientUser[]) => ({
    type: actionTypes.SET_USERS,
    payload: users
})

export const addUser = (user: IUser) => ({
    type: actionTypes.ADD_USER,
    payload: user
})
