import { AnyAction } from "redux"
import { takeEvery, put, all, select } from 'redux-saga/effects'

import { actionTypes, fetchAllUsers } from "../actions"
import { IAppState } from "../reducers";

export function* watchUsers() {
    yield all([
        takeEvery((action: AnyAction) => action.type === actionTypes.LOGIN && action.status === actionTypes.SUCCESS, getAllUsersSaga)
    ])
}

function* getAllUsersSaga(action: AnyAction) {
    const state: IAppState = yield select()
    if (!state.users.isComplete) {
        yield put(fetchAllUsers())
    }
}
