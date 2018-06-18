import { db, IGroup } from '../models'

const dbName = 'group'

export const getAllGroups = async () => {
    const allGroups = await db.find(dbName)
    return Promise.all(allGroups.map(populateUsers))
}

export const getAllGroupsByUserId = async (userId) => {
    const allGroups = await db.find(dbName)
    const filterGroups = allGroups.filter(group => group.userIds.includes(userId))
    return Promise.all(filterGroups.map(populateUsers))
}

export const getGroupById = async (id: string) => {
    const group = await db.findOne(dbName, { id })
    return populateUsers(group)
}

export const addGroup = async (group) => {
    group['id'] = Date.now() + ""
    return db.add('group', group)
}

export const updateGroup = async (id: string, updatedGroup: IGroup) => {
    return db.update(dbName, { id }, updatedGroup)
}

export const deleteGroup = async (id: string) => {
    return db.delete(dbName, { id })
}

const populateUsers = async (group) => {
    if ('userIds' in group) {
        group['users'] = await Promise.all(group['userIds'].map(getUserById))
    }
    return group

    async function getUserById(id) {
        return db.findOne('user', { id })
    }
}
