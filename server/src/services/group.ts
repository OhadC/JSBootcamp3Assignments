import * as _ from 'lodash'

import { db, IServerGroup, IClientGroup, IServerConversation } from '../models'
import { getUserById } from './user'
import { conversationService, messageService } from '.'

const dbName = 'group'

export const getAllGroups = async () => {
    const allGroups: IServerGroup[] = await db.find(dbName)
    return Promise.all(allGroups.map(withUsers))
}

export const getAllGroupsByUserId = async (userId) => {
    const filterGroups: IServerGroup[] = await db.find(dbName, { userIds: userId })
    return Promise.all(filterGroups.map(withUsers))
}

export const getGroupById = async (id: string) => {
    const group: IServerGroup = await db.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    return withUsers(group)
}

export const addGroup = async ({ name, parentId, userIds }) => {
    if (parentId && !(await db.findOne(dbName, { id: parentId }))) {
        throw Error('No group with that ID, ' + parentId)
    }
    const newGroup: IServerGroup = await db.add(dbName, { name, parentId, userIds })
    return withUsers(newGroup)
}

export const updateGroup = async (id: string, { name, userIds, }) => {
    const group: IServerGroup = await db.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    if (await db.findOne(dbName, { parentId: group.parentId, name })) {
        throw Error('Group with that name already exists. ' + name)
    }
    const updatedGroupFromDb = db.update(dbName, { id }, { name, userIds, })
    return withUsers(updatedGroupFromDb)
}

export const deleteGroup = async (id: string) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No group with that ID, ' + id)
    }
    const children = await db.find(dbName, { parentId: id })
    Promise.all([
        conversationService.deleteConversationByParentIds(id),
        db.delete(dbName, { id }),
        Promise.all(children.map(child => deleteGroup(child.id)))
    ])
    return "Group deleted"
}

export const removeUserFromAllGroups = async (userId: string) => {
    const allGroupsWithUser: IServerGroup[] = await db.find(dbName, { userIds: userId })
    await Promise.all(
        allGroupsWithUser.map(
            group => removeUserFromGroup(group, userId)
        ))

    function removeUserFromGroup(group, userId) {
        group.userIds = _.difference(group.userIds, [userId])
        return db.update(dbName, { id: group.id }, { userIds: group.userIds })
    }
}

export const getMessagesById = async (groupId: string) => {
    const conversation: IServerConversation = await conversationService.getConversationOfGroup(groupId)
    return messageService.getMessagesOfConversation(conversation.id)
}

const withUsers = async (group: any): Promise<IClientGroup> => {    // TODO: do this on client
    if ('userIds' in group) {
        group.users = await Promise.all(group.userIds.map(getUserById))
    }
    return group
}
