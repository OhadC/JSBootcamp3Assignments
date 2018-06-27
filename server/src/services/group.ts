import { db, IGroup, IServerGroup, IClientGroup } from '../models'
import { getUserById } from './user'
import { messageService } from '.'

const dbName = 'group'

export const getAllGroups = async () => {
    const allGroups: IServerGroup[] = await db.find(dbName)
    return Promise.all(allGroups.map(populateUsers))
}

export const getAllGroupsByUserId = async (userId) => {
    const allGroups: IServerGroup[] = await db.find(dbName)
    const filterGroups: IServerGroup[] = allGroups.filter(group => group.userIds.includes(userId))
    return Promise.all(filterGroups.map(populateUsers))
}

export const getGroupById = async (id: string) => {
    const group: IServerGroup = await db.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    return populateUsers(group)
}

export const addGroup = async (groupToAdd: IGroup) => {
    if (groupToAdd.parentId && !(await db.findOne(dbName, { id: groupToAdd.parentId }))) {
        throw Error('No group with that ID, ' + groupToAdd.parentId)
    }
    // TODO: no users, etc..
    const newGroup: IServerGroup = await db.add(dbName, groupToAdd)
    return populateUsers(newGroup)
}

export const updateGroup = async (id: string, updatedGroup: IGroup) => {
    const group: IServerGroup = await db.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    // TODO: no parentId, no users, etc..
    updatedGroup = { ...group, ...updatedGroup }
    const updatedGroupFromDb = db.update(dbName, { id }, updatedGroup)
    return populateUsers(updatedGroupFromDb)
}

export const deleteGroup = async (id: string) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No group with that ID, ' + id)
    }
    const children = await db.find(dbName, { parentId: id })
    await messageService.deleteAllMessagesOfgroup(id)
    await db.delete(dbName, { id })
    await Promise.all(children.map(child => deleteGroup(child.id)))
    return "Group deleted"
}

export const deleteUserFromAllGroups = async (userId: string) => {
    const allGroups: IServerGroup[] = await db.find(dbName)
    const groupsToUpdate = []
    const groupsToDelete = []
    allGroups.forEach(group => {
        if (group.userIds) {
            const idIndex = group.userIds.findIndex(id => id === userId)
            if (idIndex !== -1) {
                if (group.isPrivate) {
                    groupsToDelete.push(group)
                } else {
                    group.userIds.splice(idIndex, 1)
                    groupsToUpdate.push(group)
                }
            }
        }
    })
    await Promise.all([
        Promise.all(groupsToUpdate.map(group => db.update(dbName, { id: group.id }, group))),
        Promise.all(groupsToDelete.map(group => deleteGroup(group.id)))
    ])
}

const populateUsers = async (group: any): Promise<IClientGroup> => {
    if ('userIds' in group) {
        group.users = await Promise.all(group.userIds.map(getUserById))
    }
    return group
}
