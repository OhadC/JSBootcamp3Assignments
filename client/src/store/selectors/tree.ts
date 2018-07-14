import { createSelector } from 'reselect'
import * as _ from 'lodash'

import { IAppState } from '../reducers'
import { IClientGroup } from '../../models'
import { makeTree } from '../../common/makeTree'
import { groupsSelector } from './groups';

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


