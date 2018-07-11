import { AnyAction } from "redux"
import { takeEvery, all, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { actionTypes } from "../actions"
import * as actions from '../actions'

export function* watchGlobal() {
    yield all([
        takeEvery((action: AnyAction) => !!action.status, loadingSaga),
        takeEvery((action: AnyAction) => !!action.status && action.status === actionTypes.FAIL, toasterSaga)
    ])
}

export function* loadingSaga(action: AnyAction) {
    switch (action.status) {
        case (actionTypes.REQUEST):
            yield put(actions.startLoading())
            break
        case (actionTypes.SUCCESS):
        case (actionTypes.FAIL):
            yield put(actions.finishLoading())
            break
    }
}

export function* toasterSaga(action: AnyAction) {       // TODO: more generic - not only error
    yield toast.error(action.payload.message)
}
