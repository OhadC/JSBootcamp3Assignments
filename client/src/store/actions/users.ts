import { IClientUser } from "../../models"
import { actionTypes } from "."

export const fetchUsers = () => fetchAllUsers()

export const fetchAllUsers = (payload?: any, status?: string) => ({
    type: actionTypes.FETCH_ALL_USERS,
    status: actionTypes.getStatus(payload, status),
    payload
})

export const addUser = (payload?: any, status?: string) => ({
    type: actionTypes.ADD_USER,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const addUserRequest = (user: IClientUser) => addUser({ user }, actionTypes.REQUEST)

export const updateUser = (payload?: any, status?: string) => ({
    type: actionTypes.UPDATE_USER,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const updateUserRequest = (updatedUserFields: IClientUser) => updateUser({ updatedUserFields }, actionTypes.REQUEST)

export const deleteUser = (payload?: any, status?: string) => ({
    type: actionTypes.DELETE_USER,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const deleteUserRequest = (userId: IClientUser) => deleteUser({ userId }, actionTypes.REQUEST)
