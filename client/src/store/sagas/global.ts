import { AnyAction } from "redux"

import * as actions from '../actions'

// function* GlobalSagas() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser)
// }

export function* loadingSaga(action: AnyAction) {
    if (action.type.endsWith('START')) {
        yield actions.startLoading()
    } else if (action.type.endsWith('SUCCESS') || action.type.endsWith('FAIL')) {
        yield actions.finishLoading()
    }
}
