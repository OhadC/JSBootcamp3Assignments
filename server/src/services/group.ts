import { db, IGroup, IServerGroup, IClientGroup } from '../models'
import { getUserById } from './user'

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

export const addGroup = async (parentGroupId: string, groupToAdd: IGroup) => {
    const parentGroup: IServerGroup = await db.findOne(dbName, { id: parentGroupId })
    if (!parentGroup) {
        throw Error('No group with that ID, ' + parentGroupId)
    }
    if (parentGroup.groupIds) {
        await Promise.all(parentGroup.groupIds.map(async (groupId) => {
            const group: IServerGroup = await db.findOne(dbName, { id: groupId })
            if (group.name === groupToAdd.name) {
                throw Error('Group with that name already exists, ' + groupToAdd.name)
            }
        }))
    }
    await db.update(dbName, { id: parentGroupId }, parentGroup)
    const newGroup: IServerGroup = await db.add(dbName, groupToAdd)
    return populateUsers(newGroup)
}

export const updateGroup = async (id: string, updatedGroup: IGroup) => {
    const group: IServerGroup = await db.findOne(dbName, { id })
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    updatedGroup = { ...group, ...updatedGroup }
    const updatedGroupFromDb = db.update(dbName, { id }, updatedGroup)
    return populateUsers(updatedGroupFromDb)
}

export const deleteGroup = async (id: string) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No group with that ID, ' + id)
    }
    // return Promise.all([db.delete(dbName, { id }), 
}

const populateUsers = async (group: any): Promise<IClientGroup> => {
    if ('userIds' in group) {
        group.users = await Promise.all(group.userIds.map(getUserById))
    }
    return group
}
