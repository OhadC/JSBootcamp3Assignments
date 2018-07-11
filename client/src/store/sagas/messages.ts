import { AnyAction } from "redux"
import { put, call, all, select, takeLatest } from 'redux-saga/effects'

import { actionTypes } from "../actions"
import * as actions from "../actions"
import { apiRequest } from "../../serverApi";

export function* watchMessages() {
    yield all([
        takeLatest(actionTypes.SET_ACTIVE, fetchMessagesSaga),
    ])
}

function* fetchMessagesSaga(action: AnyAction) {
    const activeGroupId = action.payload.active._id
    const { auth: { token } } = yield select()
    try {
        const response = yield call(apiRequest, {
            url: `/group/${activeGroupId}/messages`,
            token
        })
        yield put(actions.fetchMessages(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.fetchMessages(errorData, actionTypes.FAIL))
    }
}
