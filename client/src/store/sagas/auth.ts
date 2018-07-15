import { AnyAction } from 'redux'
import { delay } from "redux-saga"
import { takeLatest, put, all, call } from 'redux-saga/effects'

import { actionTypes } from "../actions"
import * as actions from "../actions"
import { apiRequest } from '../../serverApi'
import { checkTypeAndStatus } from './utils'

export function* watchAuth() {
    yield all([
        takeLatest(actionTypes.LOGIN_FROM_LOCALSTORAGE, loginFromLocalstorageSaga),
        takeLatest(checkTypeAndStatus(actionTypes.LOGIN, actionTypes.REQUEST), loginSaga),
        takeLatest(checkTypeAndStatus(actionTypes.LOGIN, actionTypes.REQUEST), loginSaga),
        takeLatest(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeLatest(actionTypes.LOGOUT, logoutSaga),
    ])
}

function* loginSaga(action: AnyAction) {
    try {
        const { name, password } = action.payload
        const response = yield call(apiRequest, {
            url: '/auth/login',
            method: 'POST',
            data: { name, password }
        })
        const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        )
        yield localStorage.setItem("token", response.data.token)
        yield localStorage.setItem("expirationDate", expirationDate.toString())
        yield localStorage.setItem("userId", response.data.user._id)

        yield put(actions.login(response.data, actionTypes.SUCCESS))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.login(errorData, actionTypes.FAIL))
    }
}

function* loginFromLocalstorageSaga(action: AnyAction) {
    try {
        const token = localStorage.getItem("token")
        const expirationDateString = localStorage.getItem("expirationDate")
        const userId = localStorage.getItem("userId")

        if (!token || !expirationDateString || !userId) return

        const expirationDate = yield new Date(expirationDateString);
        if (expirationDate <= new Date()) return

        const { data: user } = yield call(apiRequest, {
            url: `/user/${userId}`,
            method: 'GET',
            token
        })
        yield put(actions.login({ token, user }));
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.login(errorData, actionTypes.FAIL))
    }
}

function* checkAuthTimeoutSaga(action: AnyAction) {
    yield delay(action.payload.expiresIn * 1000);
    yield put(actions.logout());
}

function* logoutSaga(action: AnyAction) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
}
