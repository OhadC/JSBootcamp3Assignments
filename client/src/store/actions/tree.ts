import { Dispatch } from "redux";
import axios from "axios"

import { actionTypes } from "."
import { IGroup, IUser, ITreeItem } from "../../models";
import treeSearch from "../../common/treeSearch";

export const setTree = (tree: any) => ({
    type: actionTypes.SET_TREE,
    payload: { tree }
})

export const setFilteredTree = (filterText: string, filteredTree: ITreeItem[]) => ({
    type: actionTypes.SET_FILTERED_TREE,
    payload: { filteredTree, filterText }
})

export const fetchTree = () => (dispatch: Dispatch, getState: Function) => {
    const url = `http://localhost:4000/group`
    axios.get(url)
        .then(response => {
            const groups = response.data
            const tree = makeTree(groups, getState().auth.user)
            dispatch(setTree(tree))
        })
}

export const setTreeFilter = (filterText: string) => (dispatch: Dispatch, getState: Function) => {
    const filteredTree = treeSearch(getState().tree.tree, predicate)

    dispatch(setFilteredTree(filterText, filteredTree))

    function predicate(item: ITreeItem) {
        return item instanceof Object && item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())
    }
}

const makeTree = (groups: IGroup[], currentUser: IUser) => {
    const treeRootGroups = groups.filter(group => group.parentId === null)

    const groupsMap = groups.reduce((obj, group) => {
        obj[group.id] = group
        return obj
    }, {})

    const treeRootNodes = treeRootGroups.map(groupToNode)
    return treeRootNodes

    function groupToNode(group: any): ITreeItem {
        let groupName = group.name
        if (!groupName) {
            groupName = group.users[0].id !== currentUser.id ? group.users[0].id : group.users[1].id
        }
        let groupItems = []
        if ('groupsIds' in group) {
            groupItems = group.groupIds.map((groupId: string) => groupToNode(groupsMap[groupId]))
        }
        return {
            groupId: group.id,
            type: group.isPrivate ? 'user' : 'group',
            name: groupName,
            items: groupItems
        }
    }
}
