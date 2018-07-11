import { AnyAction } from "redux"
import { takeEvery, put, all, select, call } from 'redux-saga/effects'
import * as _ from 'lodash'

import { actionTypes } from "../actions"
import { IClientGroup } from "../../models"
import { apiRequest } from '../../serverApi'
import * as actions from "../actions"

export function* watchGroups() {
    yield all([
        takeEvery((action: AnyAction) => action.type === actionTypes.LOGIN && action.status === actionTypes.SUCCESS, fetchGroupsSaga),
        takeEvery((action: AnyAction) => action.type === actionTypes.ADD_GROUP && action.status === actionTypes.REQUEST, addGroupSaga),
        takeEvery(actionTypes.SET_ADMIN_EDIT_MODE, fetchAllGroupsSaga),
        takeEvery(actionTypes.SELECT_PRIVATE_GROUP, selectPrivateGroupSaga),
    ])
}

function* fetchGroupsSaga(action: AnyAction) {
    const { auth: { token } } = yield select()
    try {
        const response = yield apiRequest({
            url: '/group',
            token
        })
        yield put(actions.fetchGroups(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.fetchGroups(errorData, actionTypes.FAIL))
    }
}

function* addGroupSaga(action: AnyAction) {
    const { auth: { token } } = yield select()
    try {
        const response = yield apiRequest({
            url: '/group',
            data: action.payload.group,
            method: 'POST',
            token
        })
        yield put(actions.addGroup(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.addGroup(errorData, actionTypes.FAIL))
    }
}

function* fetchAllGroupsSaga(action: AnyAction) {
    const { auth: { token } } = yield select()
    try {
        const response = yield apiRequest({
            url: '/group',
            token
        })
        yield put(actions.fetchAllGroups(response.data, actionTypes.SUCCESS))
    } catch (error) {
        const errorData = error.response.data
        console.log(errorData)
        yield put(actions.fetchAllGroups(errorData, actionTypes.FAIL))
    }
}

function* selectPrivateGroupSaga(action: AnyAction) {
    const { groupId, userId } = action.payload
    const { groups: { data: groups }, tree: { expandedIds }, auth: { token } } = yield select()
    const idParentGroupExpanded = _.includes(expandedIds, groupId)
    const group = groups.find((group: IClientGroup) =>
        group.isPrivate && group.parentId === groupId && group.userIds && _.includes(group.userIds, userId))
    if (!idParentGroupExpanded) {
        yield put(actions.setExpandedIds([...expandedIds, groupId]))
    }
    if (!!group) {
        yield put(actions.setForcedActive(group))
    }
    else {
        try {
            const response = yield call(apiRequest, {
                url: `/group/${groupId}/private/${userId}`,
                token
            })
            yield put(actions.setActive(response.data))
            yield put(actions.addGroup(response.data))
        } catch (error) {
            const errorData = error.response.data
            console.log(errorData)
        }
    }
}
