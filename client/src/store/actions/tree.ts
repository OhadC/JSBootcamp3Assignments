import { Dispatch, AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IClientGroup, ITreeItem } from "../../models"
import treeSearch from "../../common/treeSearch"
import { IAppState } from "../reducers";

const setTree = (tree: any): AnyAction => ({
    type: actionTypes.SET_TREE,
    payload: { tree }
})

const setFilteredTree = (filterText: string, filteredTree: ITreeItem[]): AnyAction => ({
    type: actionTypes.SET_FILTERED_TREE,
    payload: { filteredTree, filterText }
})

export const fetchTree = () => (dispatch: Dispatch, getState: Function) => {
    const userId = getState().auth.userId
    const success = (groups: any[]) => {
        const tree = makeTree(groups, userId)
        dispatch(setTree(tree))
    }
    dispatch(apiRequest({
        url: '/group',
        success
    }))
}

export const setTreeFilter = (filterText: string) => (dispatch: Dispatch, getState: () => IAppState) => {
    const { filterText: oldFilterText, tree: fullTree } = getState().tree
    if (filterText === oldFilterText) {
        return
    } else if (filterText === "") {
        dispatch(setFilteredTree(filterText, fullTree))
        return
    }
    const filteredTree = treeSearch(fullTree, predicate)

    dispatch(setFilteredTree(filterText, filteredTree))

    function predicate(item: ITreeItem) {
        return item instanceof Object && item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())
    }
}

const makeTree = (groups: IClientGroup[], userId: string) => {
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
