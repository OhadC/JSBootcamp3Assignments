import { AnyAction } from "redux"
import { takeEvery, put, call, all, select } from 'redux-saga/effects'

import { actionTypes } from "../actions"
import * as actions from "../actions"
import { apiRequest } from "../../serverApi";

export function* watchMessages() {
    yield all([
        takeEvery(actionTypes.SET_ACTIVE, fetchMessagesSaga),
    ])
}

function* fetchMessagesSaga(action: AnyAction) {
    const activeGroupId = action.payload.active._id
    const { auth: { token } } = yield select()
    const response = yield call(apiRequest, {
        url: `/group/${activeGroupId}/messages`,
        token
    })
    yield put(actions.fetchMessages(response.data, actionTypes.SUCCESS))
}
