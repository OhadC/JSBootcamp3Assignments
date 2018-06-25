import { AnyAction } from "redux"

import { actionTypes, fetchGroups, setGroups, setShownGroups, setActiveGroupId } from "../actions"
import { IClientGroup, IClientGroupObject } from "../../models"

export const treeMiddleware = ({ dispatch, getState }: any) => (next: Function) => (action: AnyAction) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            dispatch(fetchGroups())
            break

        case (actionTypes.FETCH_GROUPS_SUCCESS):
            next(action)
            const groups: IClientGroup[] = action.payload
            const userId = getState().global.user.id
            const groupsObject = groupsToGroupsObject(populateGroupsNames(groups, userId))
            dispatch(setGroups(groupsObject))
            const shownGroups = groups.filter((group: IClientGroup) => group.isRoot)
            dispatch(setShownGroups(shownGroups))
            dispatch(setActiveGroupId(shownGroups[0].id))
            break

        case (actionTypes.EXPAND_GROUP):
            const groupToExpand: IClientGroup = action.payload.group
            if ('groupIds' in groupToExpand) {
                const { allGroups, shownGroups } = getState().tree
                const groupIndex = shownGroups.findIndex((group: IClientGroup) => group === groupToExpand)
                const childGroups = groupToExpand.groupIds!.map(groupId => {
                    allGroups[groupId].level = (groupToExpand.level || 0) + 1
                    return allGroups[groupId]
                })
                const newShownGroups: IClientGroup[] = shownGroups.slice()
                newShownGroups[groupIndex] = {...newShownGroups[groupIndex], isExpanded: true}
                newShownGroups.splice(groupIndex + 1, 0, ...childGroups)
                dispatch(setShownGroups(newShownGroups))
            }
            break

        case (actionTypes.FOLD_GROUP):
            const groupToFold: IClientGroup = action.payload.group
            if (groupToFold.isExpanded) {
                const { shownGroups } = getState().tree
                const groupIndex = shownGroups.findIndex((group: IClientGroup) => group === groupToFold)
                const groupsToDelete: number = shownGroups
                    .slice(groupIndex + 1)
                    .findIndex((group: IClientGroup) => !group.level || group.level < (groupToFold.level || 0))
                const newShownGroups: IClientGroup[] = shownGroups.slice()
                newShownGroups.splice(groupIndex + 1, groupsToDelete)
                newShownGroups[groupIndex] = {...newShownGroups[groupIndex], isExpanded: false}
                dispatch(setShownGroups(newShownGroups))
            }
            break

        default: next(action)
    }
}

const populateGroupsNames = (groups: IClientGroup[], userId: string) => {
    return groups.map((group: IClientGroup) => {
        if (!group.name) group.name = getName(group)
        return group
    })

    function getName(group: IClientGroup) {
        return group.users[0].id != userId ? group.users[0].name : group.users[1].name
    }
}

const groupsToGroupsObject = (groups: IClientGroup[]): IClientGroupObject => {
    return groups.reduce((prev: any, group: IClientGroup) => {
        prev[group.id] = group
        return prev
    }, {})
}
