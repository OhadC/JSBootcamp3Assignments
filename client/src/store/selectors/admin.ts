import { createSelector } from 'reselect'

import { IAppState } from '../reducers'
import { IClientGroup, IClientUser } from '../../models'
import { makeTree } from '../../common/makeTree'

const groupsSelector = (state: IAppState) => state.groups.data
const usersSelector = (state: IAppState) => state.users.data
const filterTextSelector = (state: IAppState) => state.tree.filterText

export const adminGroupsTreeSelector = createSelector(
    groupsSelector,
    filterTextSelector,
    groupsTreeCombiner
)

export const adminUsersTreeSelector = createSelector(
    usersSelector,
    filterTextSelector,
    usersTreeCombiner
)

function groupsTreeCombiner(groups: IClientGroup[], filterText?: string) {
    return makeTree(onlyPublicGroups(groups), "", filterText)
}

function usersTreeCombiner(users: IClientUser[], filterText?: string) {
    const groupsFromUsers = users.map(user => ({
        _id: user._id,
        name: user.name,
        isPrivate: true,
        age: user.age
    }))
    return makeTree((groupsFromUsers as any), "", filterText)
}

function onlyPublicGroups(groups: IClientGroup[]) {
    return groups.filter(group => !group.isPrivate)
}
