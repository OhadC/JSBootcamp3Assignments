import { AnyAction } from "redux"
import { put, call, all, select, takeLatest } from 'redux-saga/effects'

import { actionTypes } from "../actions"
import * as actions from "../actions"
import { apiRequest } from "../../serverApi"

export function* watchUsers() {
    yield all([
        takeLatest((action: AnyAction) => action.type === actionTypes.FETCH_ALL_USERS && action.status === actionTypes.REQUEST, fetchAllUsersSaga),
        takeLatest((action: AnyAction) => action.type === actionTypes.ADD_USER && action.status === actionTypes.REQUEST, addUserSaga),
        takeLatest((action: AnyAction) => action.type === actionTypes.UPDATE_USER && action.status === actionTypes.REQUEST, updateUserSaga),
        takeLatest((action: AnyAction) => action.type === actionTypes.DELETE_USER && action.status === actionTypes.REQUEST, deleteUserSaga),
        takeLatest((action: AnyAction) => action.type === actionTypes.LOGIN && action.status === actionTypes.SUCCESS, fetchAllUsersSaga),
    ])
}

function* fetchAllUsersSaga(action: AnyAction) {
    const { users: { isComplete }, auth: { token } } = yield select()
    if (isComplete) return

    try {
        const response = yield call(apiRequest, {
            url: '/user',
            method: 'GET',
            token
        })
        yield put(actions.fetchAllUsers(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.fetchAllUsers(errorData, actionTypes.FAIL))
    }
}

function* addUserSaga(action: AnyAction) {
    const { auth: { token } } = yield select()
    const { user } = action.payload
    try {
        const response = yield call(apiRequest, {
            url: '/user',
            method: 'POST',
            data: user,
            token
        })
        yield put(actions.addUser(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.addUser(errorData, actionTypes.FAIL))
    }
}

function* updateUserSaga(action: AnyAction) {
    const { auth: { token } } = yield select()
    const { updatedUserFields } = action.payload
    try {
        const response = yield call(apiRequest, {
            url: `/user/${updatedUserFields._id}`,
            method: 'PUT',
            data: updatedUserFields,
            token
        })
        yield put(actions.updateUser(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.updateUser(errorData, actionTypes.FAIL))
    }
}

function* deleteUserSaga(action: AnyAction) {
    const { auth: { token } } = yield select()
    const { userId } = action.payload
    try {
        const response = yield call(apiRequest, {
            url: `/user/${userId}`,
            method: 'DELETE',
            token
        })
        yield put(actions.deleteUser(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.deleteUser(errorData, actionTypes.FAIL))
    }
}
