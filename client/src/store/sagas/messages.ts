import { AnyAction } from "redux"
import { takeEvery, put, all } from 'redux-saga/effects'

import { actionTypes, fetchMessages } from "../actions"

export function* watchMessages() {
    yield all([
        takeEvery(actionTypes.SET_ACTIVE, fetchMessagesSaga),
    ])
}

function* fetchMessagesSaga(action: AnyAction) {
    yield put(fetchMessages(action.payload.active._id))
}
