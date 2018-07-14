import { createSelector } from 'reselect'

import { IAppState } from '../reducers'
import { IClientGroup, IClientUser } from '../../models'
import { makeTree } from '../../common/makeTree'
import { publicGroupsSelector } from './groups'
import { usersSelector } from './users'

const adminFilterTextSelector = (state: IAppState) => state.admin.filterText

export const adminGroupsTreeSelector = createSelector(
    publicGroupsSelector,
    adminFilterTextSelector,
    groupsTreeCombiner
)

export const adminUsersTreeSelector = createSelector(
    usersSelector,
    adminFilterTextSelector,
    usersTreeCombiner
)

function groupsTreeCombiner(publicGroups: IClientGroup[], filterText?: string) {
    return makeTree(publicGroups, "", filterText)
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
