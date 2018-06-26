import { Dispatch, AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IClientGroup, ITreeItem, IClientUser } from "../../models"
import treeSearch from "../../common/treeSearch"
import { IAppState } from "../reducers"

const setTree = (tree: any, itemsType?: 'groups' | 'users'): AnyAction => ({
    type: actionTypes.SET_TREE,
    payload: { tree, itemsType }
})

const setFilteredTree = (filterText: string, filteredTree: ITreeItem[]): AnyAction => ({
    type: actionTypes.SET_FILTERED_TREE,
    payload: { filteredTree, filterText }
})

export const setActive = (active: IClientGroup | IClientUser): AnyAction => ({
    type: actionTypes.SET_ACTIVE,
    payload: { active }
})

export const setExpandedIds = (expandedIds: string[]): AnyAction => ({
    type: actionTypes.SET_EXPANDED_IDS,
    payload: { expandedIds }
})

export const setTreeItemsType = (itemsType: 'groups' | 'users') => ({
    type: actionTypes.SET_TREE_ITEMS_TYPE,
    payload: { itemsType }
})

export const fetchTree = (itemsType?: 'groups' | 'users') => (dispatch: Dispatch, getState: Function) => {
    const { auth: { userId }, tree: { itemsType: itemsTypeFromState } } = getState()
    itemsType = itemsType || itemsTypeFromState
    if (itemsType === 'groups') {
        const success = (groups: IClientGroup[]) => {
            const tree = makeGroupsTree(groups, userId)
            dispatch(setTree(tree, itemsType))
        }
        dispatch(apiRequest({
            url: '/group',
            success
        }))
    } else {
        const success = (users: IClientUser[]) => {
            const tree = makeUsersTree(users)
            dispatch(setTree(tree, itemsType))
        }
        dispatch(apiRequest({
            url: '/user',
            success
        }))
    }
}

export const setTreeFilter = (filterText: string) => (dispatch: Dispatch, getState: () => IAppState) => {
    const { filterText: oldFilterText, tree: fullTree } = getState().tree
    if (filterText === oldFilterText) {
        return
    } else if (filterText === "") {
        dispatch(setFilteredTree(filterText, fullTree))
        return
    }
    const filteredTree = filterTree(fullTree, filterText)

    dispatch(setFilteredTree(filterText, filteredTree))
}

const filterTree = (fullTree: ITreeItem[], filterText: string) => {
    return treeSearch(fullTree, predicate)

    function predicate(item: ITreeItem) {
        return item instanceof Object && item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())
    }
}

const makeGroupsTree = (groups: IClientGroup[], userId: string) => {
    const treeRootGroups = groups.filter(group => group.isRoot)

    const groupsMap = groups.reduce((obj, group) => {
        obj[group.id] = group
        return obj
    }, {})

    const treeRootNodes = treeRootGroups.map(groupToNode)
    return treeRootNodes

    function groupToNode(group: any): ITreeItem {
        let name = !group.isPrivate ? group.name :
            (group.users[0].id != userId ?
                group.users[0].name : group.users[1].name)

        let items = []
        if ('groupIds' in group && !!group.groupIds) {
            items = group.groupIds.map((groupId: string) => groupToNode(groupsMap[groupId]))
        }

        return {
            group,
            type: group.isPrivate ? 'user' : 'group',
            name,
            items
        }
    }
}

const makeUsersTree = (users: IClientUser[]) => {
    return users.map((user) => ({
        group: user,
        type: 'user',
        name: user.name
    }))
}
