import { Dispatch, AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IClientGroupObject, IClientGroup } from "../../models"
import { IAppState } from "../reducers";

export const setGroups = (groups: IClientGroupObject): AnyAction => ({
    type: actionTypes.SET_GROUPS,
    payload: { groups }
})

export const setShownGroups = (shownGroups: IClientGroup[]) => ({
    type: actionTypes.SET_SHOWN_GROUPS,
    payload: { shownGroups }
})

export const setActiveGroupId = (groupId: string): AnyAction => ({
    type: actionTypes.SET_ACTIVE_GROUP_ID,
    payload: { groupId }
})

export const expandGroup = (group: IClientGroup): AnyAction => ({
    type: actionTypes.EXPAND_GROUP,
    payload: { group }
})

export const foldGroup = (group: IClientGroup): AnyAction => ({
    type: actionTypes.FOLD_GROUP,
    payload: { group }
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
}

export const keyEventOnTree = (keyName: string) => (dispatch: Dispatch, getState: () => IAppState) => {
    const { shownGroups, activeGroupId } = getState().tree
    const activeGroupIndex = shownGroups.findIndex(group => activeGroupId === group.id)
    switch (keyName) {
        case 'ArrowUp':
            if (activeGroupIndex > 0) dispatch(setActiveGroupId(shownGroups[activeGroupIndex - 1].id))
            return
        case 'ArrowDown':
            if (activeGroupIndex < shownGroups.length - 1) dispatch(setActiveGroupId(shownGroups[activeGroupIndex + 1].id))
            return
        case 'ArrowRight':
            if (!activeGroup!.isExpanded) dispatch(expandGroup(activeGroup!))
            return
        case 'ArrowLeft':
            if (activeGroup!.isExpanded) {
                dispatch(foldGroup(activeGroup!))
            } else {
                const parentGroup = getParent(activeGroup!)
                dispatch(setActiveGroupId(parentGroup || shownGroups[0]))
            }
            return
        case 'Enter':
            if (activeGroup!.isExpanded) {
                dispatch(expandGroup(activeGroup!))
            } else {
                dispatch(foldGroup(activeGroup!))
            }
            return
    }

    function getParent(childGroup: IClientGroup) {
        return shownGroups
            .find((group: IClientGroup) => (group.level || 0) === childGroup.level! - 1)   // TODO: more simple
        // .find((group: any) => group.groupIds && group.groupIds.findIndex((id: string) => childGroup.id === id))   // TODO: more simple
    }
}
