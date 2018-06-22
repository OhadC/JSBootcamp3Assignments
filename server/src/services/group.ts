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
    return populateUsers(group)
}

export const addGroup = async (group: IGroup) => {
    const newGroup = await db.add(dbName, group)
    return populateUsers(newGroup)
}

export const updateGroup = async (id: string, updatedGroup: IGroup) => {
    const updatedGroupFromDb = db.update(dbName, { id }, updatedGroup)
    return populateUsers(updatedGroupFromDb)
}

export const deleteGroup = async (id: string) => {
    return db.delete(dbName, { id })
}

const populateUsers = async (group: any): Promise<IClientGroup> => {
    if ('userIds' in group) {
        group.users = await Promise.all(group.userIds.map(getUserById))
    }
    return group
}
