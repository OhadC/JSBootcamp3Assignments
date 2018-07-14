import { AnyAction } from "redux"
import { put, call, all, select, takeLatest } from 'redux-saga/effects'

import { actionTypes } from "../actions"
import * as actions from "../actions"
import { apiRequest } from "../../serverApi"
import { checkTypeAndStatus } from "./utils"

export function* watchMessages() {
    yield all([
        takeLatest(actionTypes.SET_ACTIVE, onActiveChangedSaga),
        takeLatest(checkTypeAndStatus(actionTypes.FETCH_MESSAGES,actionTypes.REQUEST), fetchMessagesSaga),
    ])
}

function* fetchMessagesSaga(action: AnyAction) {
    const { groupId } = action.payload
    const { auth: { token } } = yield select()
    try {
        const response = yield call(apiRequest, {
            url: `/group/${groupId}/messages`,
            token
        })
        yield put(actions.fetchMessages(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.fetchMessages(errorData, actionTypes.FAIL))
    }
}

function* onActiveChangedSaga(action: AnyAction) {
    yield put(actions.fetchMessagesRequest(action.payload.active._id))
}
