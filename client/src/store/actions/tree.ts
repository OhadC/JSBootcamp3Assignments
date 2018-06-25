import { Dispatch, AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IClientGroupObject } from "../../models"
import { IAppState } from "../reducers";

export const setGroups = (groups: IClientGroupObject): AnyAction => ({
    type: actionTypes.SET_GROUPS,
    payload: { groups }
})

const setFilteredGroups = (filterText: string, filteredGroups: IClientGroupObject): AnyAction => ({
    type: actionTypes.SET_FILTERED_GROUPS,
    payload: { filteredGroups, filterText }
})

export const fetchGroups = () =>
    apiRequest({
        url: '/group',
        label: "fetchGroups"
    })

export const setGroupsFilter = (filterText: string) => (dispatch: Dispatch, getState: () => IAppState) => {
    const { filterText: oldFilterText, allGroups } = getState().tree
    if (filterText === oldFilterText) {
        return
    } else if (filterText === "") {
        dispatch(setFilteredGroups(filterText, allGroups))
        return
    }
    const filteredGroups = allGroups

    dispatch(setFilteredGroups(filterText, filteredGroups))

    // function predicate(group: IGroup) {
    //     return group.name && group.name.toLowerCase().includes(filterText.toLowerCase())
    // }
}
