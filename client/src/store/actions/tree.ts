import { AnyAction } from "redux"

import { actionTypes } from "."
import { IClientGroup, IClientUser } from "../../models"

export const setTreeFilter = (filterText: string) => ({
    type: actionTypes.SET_TREE_FILTER,
    payload: { filterText }
})

export const setActive = (active: IClientGroup | IClientUser): AnyAction => ({
    type: actionTypes.SET_ACTIVE,
    payload: { active }
})

export const setExpandedIds = (expandedIds: string[]): AnyAction => ({
    type: actionTypes.SET_EXPANDED_IDS,
    payload: { expandedIds }
})
