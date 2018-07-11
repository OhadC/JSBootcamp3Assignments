import * as _ from 'lodash'
import { toast } from 'react-toastify'

import { actionTypes,  startLoading, finishLoading, setActive, setExpandedIds, apiRequest, addGroup, setForcedActive } from "../actions"
import { IClientGroup } from '../../models';

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: any) => {
    switch (action.type) {

        case (actionTypes.SELECT_PRIVATE_GROUP):
            const { groupId, userId } = action.payload
            const { groups: { data: groups }, tree: { expandedIds } } = getState()
            const idParentGroupExpanded = _.includes(expandedIds, groupId)
            const group = groups.find((group: IClientGroup) => group.isPrivate && group.parentId === groupId && group.userIds && _.includes(group.userIds, userId))
            if (!idParentGroupExpanded) {
                dispatch(setExpandedIds([...expandedIds, groupId]))
            }
            if (!!group) {
                dispatch(setForcedActive(group))
            }
            else {
                dispatch(apiRequest({
                    url: `/group/${groupId}/private/${userId}`,
                    success: (group: IClientGroup) => {
                        dispatch(setActive(group))
                        dispatch(addGroup(group))
                    }
                }))
            }

        default: next(action)
    }
    if (action.type.endsWith('START')) {
        dispatch(startLoading())
    } else if (action.type.endsWith('SUCCESS')) {
        dispatch(finishLoading())
    } else if (action.type.endsWith('FAIL')) {
        dispatch(finishLoading())
        action.payload && action.payload && toast.error(action.payload)
    }
}
