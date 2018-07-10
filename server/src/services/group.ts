import * as _ from 'lodash'

import { jsonDb, IGroup, IServerGroup, IClientGroup } from '../models'
import { getUserById } from './user'
import { messageService } from '.'

const dbName = 'group'

export const getAllGroups = async () => {
    const allGroups: IServerGroup[] = await jsonDb.find(dbName, { isPrivate: false })
    return Promise.all(allGroups.map(withUsers))
}

export const getAllGroupsByUserId = async (userId) => {
    const filterGroups: IServerGroup[] = await jsonDb.find(dbName, { userIds: userId })
    return Promise.all(filterGroups.map(withUsers))
}

export const getGroupById = async (id: string) => {
    const group: IServerGroup = await jsonDb.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    return withUsers(group)
}

export const getPrivateGroup = async (parentGroupId, userId1, userId2) => {
    let group = await jsonDb.findOne(dbName, { parentId: parentGroupId, isPrivate: true, userIds: [userId1, userId2] })
    if (!group) {
        const [parentGroup, user1, user2] = await Promise.all([
            jsonDb.findOne(dbName, { id: parentGroupId }),
            jsonDb.findOne('user', { id: userId1 }),
            jsonDb.findOne('user', { id: userId2 })
        ])
        if (!parentGroup || !user1 || !user2 || !_.includes(parentGroup.userIds, userId1) || !_.includes(parentGroup.userIds, userId2)) {
            throw Error('Bad request')
        }
        group = await jsonDb.add(dbName, { parentId: parentGroupId, isPrivate: true, userIds: [userId1, userId2] })
    }
    return withUsers(group)
}

export const addGroup = async (groupToAdd: IGroup) => {
    if (groupToAdd.parentId && !(await jsonDb.findOne(dbName, { id: groupToAdd.parentId }))) {
        throw Error('No group with that ID, ' + groupToAdd.parentId)
    }
    // TODO: no users, etc..
    const newGroup: IServerGroup = await jsonDb.add(dbName, groupToAdd)
    return withUsers(newGroup)
}

export const updateGroup = async (id: string, updatedGroup: IGroup) => {
    const group: IServerGroup = await jsonDb.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    if (group.userIds) {
        const usersIdsRemoved = _.difference(group.userIds, updatedGroup.userIds)
        let groupsToDelete: IServerGroup[] = []
        await Promise.all(
            usersIdsRemoved.map(async userId => {
                groupsToDelete.concat(await jsonDb.find(dbName, { parentId: id, userIds: userId }))
            })
        )
        await Promise.all(groupsToDelete.map(group => deleteGroup(group.id)))
    }
    const updatedGroupFromDb = await jsonDb.update(dbName, { id }, updatedGroup)
    return withUsers(updatedGroupFromDb)
}

export const deleteGroup = async (id: string) => {
    if (!(await jsonDb.findOne(dbName, { id }))) {
        throw Error('No group with that ID, ' + id)
    }
    const children = await jsonDb.find(dbName, { parentId: id })
    Promise.all([
        messageService.deleteAllMessagesOfgroup(id),
        jsonDb.delete(dbName, { id }),
        Promise.all(children.map(child => deleteGroup(child.id)))
    ])
    return "Group deleted"
}

export const deleteUserFromAllGroups = async (userId: string) => {
    const allGroupsWithUser: IServerGroup[] = await jsonDb.find(dbName, { userIds: userId })
    await Promise.all(
        allGroupsWithUser.map(group => {
            if (group.isPrivate) {
                deleteGroup(group.id)
            } else {
                group.userIds = _.difference(group.userIds, [userId])
                jsonDb.update(dbName, { id: group.id }, group)
            }
        })
    )
}

const withUsers = async (group: any): Promise<IClientGroup> => {
    if ('userIds' in group) {
        group.users = await Promise.all(group.userIds.map(getUserById))
    }
    return group
}
