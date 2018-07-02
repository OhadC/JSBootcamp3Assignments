import { IClientUser, IUser } from "../../models"
import { actionTypes, apiRequest } from "."

export const fetchUsers = () => fetchAllUsers()

export const fetchAllUsers = () => apiRequest({
    url: '/user',
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
