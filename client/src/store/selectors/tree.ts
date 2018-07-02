import { createSelector } from 'reselect'
import * as _ from 'lodash'

import { IAppState } from '../reducers'
import { IClientGroup, ITreeItem } from '../../models'

const groupsSelector = (state: IAppState) => state.groups.data
const userIdSelector = (state: IAppState) => state.auth.userId
const filterTextSelector = (state: IAppState) => state.tree.filterText

export const treeSelector = createSelector(
    groupsSelector,
    userIdSelector,
    filterTextSelector,
    (groups: IClientGroup[], userId: string, filterText?: string) => makeTree(onlyUserGroups(groups, userId), userId, filterText)
)

function onlyUserGroups(gorups: IClientGroup[], userId: string) {
    return gorups.filter(group => {
        return group.userIds && _.includes(group.userIds, userId)
    })
}

export function makeTree(groups: IClientGroup[], userId: string, filterText?: string): ITreeItem[] {
    groups.forEach(group => {
        group.name = group.name || (group.users[0].id != userId ? group.users[0].name : group.users[1].name)
    })
    const roots: ITreeItem[] = []
    const groupsMap = _.keyBy(groups, 'id')
    const treeItemsMap: { [key: string]: ITreeItem } = {}

    groups.forEach(group => {
        const treeItem: ITreeItem = treeItemsMap[group.id] = treeItemsMap[group.id] || groupToNode(group)  // Seems legit.
        if (!!group.parentId && group.parentId in groupsMap) {
            treeItemsMap[group.parentId] = treeItemsMap[group.parentId] || groupToNode(groupsMap[group.parentId])
            treeItemsMap[group.parentId].items!.push(treeItem)
        } else {
            roots.push(treeItem)
        }
    })

    if (!filterText) {
        return roots
    } else {
        return _.values(treeItemsMap)
            .filter((item: ITreeItem) => item.name.toLowerCase().includes(filterText.toLowerCase()))
    }

    function groupToNode(group: any): ITreeItem {
        return {
            group,
            type: group.isPrivate ? 'user' : 'group',
            name: group.name,
            items: []
        }
    }
}
