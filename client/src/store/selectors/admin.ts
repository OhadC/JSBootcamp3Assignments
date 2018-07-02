import { createSelector } from 'reselect'

import { IAppState } from '../reducers'
import { IClientGroup, IClientUser } from '../../models'
import { makeTree } from '.'

const groupsSelector = (state: IAppState) => state.groups.data
const usersSelector = (state: IAppState) => state.users.data
const filterTextSelector = (state: IAppState) => state.tree.filterText
const editModeSelector = (state: IAppState) => state.admin.editMode

export const adminTreeSelector = createSelector(
    groupsSelector,
    usersSelector,
    editModeSelector,
    filterTextSelector,
    selectorsToTree
)

function selectorsToTree(groups: IClientGroup[], users: IClientUser[], editModeSelector: 'groups' | 'users', filterText?: string) {
    if (editModeSelector === 'groups') {
        return makeTree(onlyPublicGroups(groups), "", filterText)
    } else {
        const groupsFromUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            isPrivate: true,
            age: user.age
        }))

        return makeTree((groupsFromUsers as any), "", filterText)
    }
}

function onlyPublicGroups(groups: IClientGroup[]) {
    return groups.filter(group => !group.isPrivate)
}
