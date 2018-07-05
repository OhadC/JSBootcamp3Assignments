import { AnyAction } from "redux"
import { takeEvery, put, all, select } from 'redux-saga/effects'
// import * as _ from 'lodash'

import { actionTypes, fetchGroups, fetchAllGroups, /*setExpandedIds, apiRequest, setActive*/ } from "../actions"
import { IAppState } from "../reducers";
// import { IClientGroup } from "../../models";

export function* watchGroups() {
    yield all([
        takeEvery(actionTypes.LOGIN_SUCCESS, getGroupsSaga),
        takeEvery(actionTypes.SET_ADMIN_EDIT_MODE, getAllGroupsSaga),
        // takeEvery(actionTypes.SELECT_PRIVATE_GROUP, selectPrivateGroupSaga),
    ])
}

function* getGroupsSaga(action: AnyAction) {
    yield put(fetchGroups())
}

function* getAllGroupsSaga(action: AnyAction) {
    const state: IAppState = yield select()
    if (!state.groups.isComplete) {
        yield put(fetchAllGroups())
    }
}

// function* selectPrivateGroupSaga(action: AnyAction) {
//     const { groupId, userId } = action.payload
//     const { groups: { data: groups }, tree: { expandedIds } } = yield select()
//     const idParentGroupExpanded = _.includes(expandedIds, groupId)
//     const group = groups.find((group: IClientGroup) =>
//         group.isPrivate && group.parentId === groupId && group.userIds && _.includes(group.userIds, userId))
//     if (!idParentGroupExpanded) {
//         yield put(setExpandedIds([...expandedIds, groupId]))
//     }
//     if (!!group) {
//         yield put(setActive(group))
//     }
//     else {
//         yield put(apiRequest({
//             url: `/group/${groupId}/private/${userId}`,
//             success: (group: IClientGroup) => {
//                 yield put(setActive(group))
//                 yield put(addGroup(group))
//             }
//         }))
//     }
// }
