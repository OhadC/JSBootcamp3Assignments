import { AnyAction } from "redux"

import { actionTypes } from "."
import { IClientGroup } from "../../models"

export const setTreeFilter = (filterText: string) => ({
    type: actionTypes.SET_TREE_FILTER,
    payload: { filterText }
})

export const setActive = (active: IClientGroup): AnyAction => ({
    type: actionTypes.SET_ACTIVE,
    payload: { active }
})

export const setExpandedIds = (expandedIds: string[]): AnyAction => ({
    type: actionTypes.SET_EXPANDED_IDS,
    payload: { expandedIds }
})

export const selectPrivateGroup = (groupId: string, userId: string) => ({
    type: actionTypes.SELECT_PRIVATE_GROUP,
    payload: { groupId, userId }
})