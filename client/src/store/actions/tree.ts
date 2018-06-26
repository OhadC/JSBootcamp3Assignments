import { Dispatch, AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IClientGroup, ITreeItem, IClientUser } from "../../models"
import { IAppState } from "../reducers"

const setTree = (items: IClientUser[] | IClientGroup[], tree: ITreeItem[], itemsType?: 'groups' | 'users'): AnyAction => ({
    type: actionTypes.SET_TREE,
    payload: { items, tree, itemsType }
})

const updateTree = (tree: ITreeItem[], filterText?: string): AnyAction => ({
    type: actionTypes.UPDATE_TREE,
    payload: { tree, filterText }
})

export const setActive = (active: IClientGroup | IClientUser): AnyAction => ({
    type: actionTypes.SET_ACTIVE,
    payload: { active }
})

export const setExpandedIds = (expandedIds: string[]): AnyAction => ({
    type: actionTypes.SET_EXPANDED_IDS,
    payload: { expandedIds }
})

export const setTreeItemsType = (itemsType: 'groups' | 'users') => fetchTree(itemsType)

export const fetchTree = (itemsType?: 'groups' | 'users') => (dispatch: Dispatch, getState: Function) => {
    const { auth: { userId }, tree: { itemsType: itemsTypeFromState } } = getState()
    itemsType = itemsType || itemsTypeFromState
    if (itemsType === 'groups') {
        const success = (groups: IClientGroup[]) => {
            const tree = makeGroupsTree(groups, userId)
            dispatch(setTree(groups, tree, itemsType))
        }
        dispatch(apiRequest({
            url: '/group',
            success
        }))
    } else {
        const success = (users: IClientUser[]) => {
            const tree = makeUsersTree(users)
            dispatch(setTree(users, tree, itemsType))
        }
        dispatch(apiRequest({
            url: '/user',
            success
        }))
    }
}

export const setTreeFilter = (filterText: string) => (dispatch: Dispatch, getState: () => IAppState) => {   // TODO:
    const { auth: { userId }, tree: { filterText: oldFilterText, items, itemsType } } = getState()
    if (filterText === oldFilterText) {
        return
    }
    const filteredTree = itemsType === 'groups' ?
        makeGroupsTree(items as IClientGroup[], userId!, filterText) : makeUsersTree(items as IClientUser[], filterText)

    dispatch(updateTree(filteredTree, filterText))
}

const makeGroupsTree = (groups: IClientGroup[], userId: string, filterText?: string): ITreeItem[] => {
    groups.forEach(group => {
        group.name = group.name || (group.users[0].id != userId ? group.users[0].name : group.users[1].name)
    })
    const groupsMap = groups.reduce((obj, group) => {
        obj[group.id] = group
        return obj
    }, {})

    let treeRootGroups
    if (!!filterText) {
        filterText = filterText.toLowerCase()
        treeRootGroups = groups.filter(group => group.name!.toLowerCase().includes(filterText!))
    } else {
        treeRootGroups = groups.filter(group => group.isRoot)
    }

    return treeRootGroups!.map(groupToNode)

    function groupToNode(group: any): ITreeItem {
        let items = []
        if ('groupIds' in group && !!group.groupIds) {
            items = group.groupIds.map((groupId: string) => groupToNode(groupsMap[groupId]))
        }
        return {
            group,
            type: group.isPrivate ? 'user' : 'group',
            name: group.name,
            items
        }
    }
}

const makeUsersTree = (users: IClientUser[], filterText?: string): any[] => {
    if (!!filterText) {
        filterText = filterText.toLowerCase()
        users = users.filter(user => user.name!.toLowerCase().includes(filterText!))
    }
    return users
        .map(user => ({
            group: user,
            type: 'user',
            name: user.name,
            items: undefined
        }))
}
