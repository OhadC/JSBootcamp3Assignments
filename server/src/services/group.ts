import * as _ from 'lodash'

import { jsonDb, IGroup, IServerGroup, IClientGroup } from '../models'
import { getUserById } from './user'
import { messageService, userService } from '.'
import { Group } from '../models/mongoose/models'

const dbName = 'group'

export const getAllGroups = async () =>
    Group.find({ isPrivate: false }).populate({ userIds: 'user' }).lean()

export const getAllGroupsByUserId = async (userId) =>
    Group.find({ userIds: userId }).lean()

export const getGroupById = async (id: string) => {
    const group: IServerGroup = await Group.findById(id).lean()
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    return group
}

export const getPrivateGroup = async (parentGroupId, userId1, userId2) => {
    let group = await Group.findOne({ parentId: parentGroupId, isPrivate: true, userIds: { $all: [userId1, userId2] } })
    if (group) {
        return group
    }

    await Promise.all([
        getGroupById(parentGroupId),
        userService.getUserById(userId1),
        userService.getUserById(userId2)
    ])

    return new Group({ parentId: parentGroupId, isPrivate: true, userIds: [userId1, userId2] }).save()
}

export const addGroup = async ({ parentId, name, userIds }: IGroup) => {
    if (parentId && !(await Group.findById(parentId))) {
        throw Error('No group with that ID, ' + parentId)
    }
    return new Group({ parentId, name, userIds, isPrivate: false }).save()
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
