// API
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAIL = 'FAIL'

// Global
export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'

// Auth
export const LOGIN = 'LOGIN'
export const LOGIN_FROM_LOCALSTORAGE = 'LOGIN_FROM_LOCALSTORAGE'
export const CHECK_AUTH_TIMEOUT = 'CHECK_AUTH_TIMEOUT'
export const LOGOUT = 'LOGOUT'

// Admin
export const SET_ADMIN_EDIT_MODE = 'SET_ADMIN_EDIT_MODE'
export const SET_ADMIN_FILTER_TEXT = 'SET_ADMIN_FILTER_TEXT'
export const SET_EDITED_ITEM = 'SET_EDITED_ITEM'
export const SET_ADMIN_EXPANDED_IDS = 'SET_ADMIN_EXPANDED_IDS'

// Messages
export const FETCH_MESSAGES = 'FETCH_MESSAGES'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SOCKET_LOGIN_SUCCESS = 'SOCKET_LOGIN_SUCCESS'

// Tree
export const SET_TREE_FILTER = 'SET_TREE_FILTER'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_FORCED_ACTIVE = 'SET_FORCED_ACTIVE'
export const SET_EXPANDED_IDS = 'SET_EXPANDED_IDS'
export const SELECT_PRIVATE_GROUP = 'SELECT_PRIVATE_GROUP'

// Groups
export const FETCH_GROUPS = 'FETCH_GROUPS'
export const FETCH_ALL_GROUPS = 'FETCH_ALL_GROUPS'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'

// Users
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_USERS = 'FETCH_USERS'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

export const getStatus = (data: any, status?: string) => {
    if (status) {
        return status
    } else if (data) {
        return SUCCESS
    } else {
        return REQUEST
    }
}
