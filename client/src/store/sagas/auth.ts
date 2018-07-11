import { AnyAction } from 'redux'
import { takeLatest, put, all, call } from 'redux-saga/effects'

import { actionTypes } from "../actions"
import * as actions from "../actions"
import { apiRequest } from '../../serverApi'

export function* watchAuth() {
    yield all([
        takeLatest((action: AnyAction) => action.type === actionTypes.LOGIN && action.status === actionTypes.REQUEST, loginSaga)
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
        yield put(actions.login(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.login(errorData, actionTypes.FAIL))
    }
}
