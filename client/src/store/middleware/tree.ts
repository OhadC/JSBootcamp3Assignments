import { AnyAction } from "redux"

import { actionTypes, fetchGroups, setGroups } from "../actions"
import { IClientGroup, IClientGroupObject } from "../../models";

export const treeMiddleware = ({ dispatch, getState }: any) => (next: Function) => (action: AnyAction) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            dispatch(fetchGroups())
            break

        case (actionTypes.FETCH_GROUPS_SUCCESS):
            next(action)
            const groupsObject = groupsToGroupsObject(action.payload)
            dispatch(setGroups(groupsObject))
            break

        default: next(action)
    }
}

const groupsToGroupsObject = (groups: IClientGroup[]): IClientGroupObject => {
    return groups.reduce((prev: any, group: IClientGroup) => {
        prev[group.id] = group
        return prev
    }, {})
}




// const allGroupsArray = Object.keys(allGroups).map((key: string) => allGroups[key])
// const shownGroups = allGroupsArray.filter((group: IClientGroup) => group.isRoot)
