import { db, IServerUser, IClientUser } from '../models'
import { authService, groupService, conversationService } from '.'

const dbName = 'user'

export const getAllUsers = async () => {
    const users: IServerUser[] = await db.find(dbName)
    return users.map(withoutPassword)
}

export const getUserById = async (id: string) => {
    const user: IServerUser = await db.findOne(dbName, { id })
    if (!user) {
        throw Error('No user with that ID, ' + id)
    }
    return withoutPassword(user)
}

export const getUserByName = async (name: string) => {
    const user: IServerUser = await db.findOne(dbName, { name })
    if (!user) {
        throw Error('No user with that name, ' + name)
    }
    return withoutPassword(user)
}

export const addUser = async ({name, password}) => {
    if (!!(await db.findOne(dbName, { name }))) {
        throw Error('User with that name already exists. ' + name)
    }
    const user: IServerUser = await db.add('user', { name, password })
    return withoutPassword(user)
}

export const updateUser = async (id: string, { age }) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No user with that ID, ' + id)
    }
    const updatedUserFromDb = db.update(dbName, { id }, { age })
    return withoutPassword(updatedUserFromDb)
}

export const deleteUser = async (id: string) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No user with that ID, ' + id)
    }
    await Promise.all([
        conversationService.deleteConversationByParentIds(id),
        groupService.removeUserFromAllGroups(id),
        db.delete(dbName, { id })
    ])
    return 'User deleted.'
}

export const getMessagesBy

export const validateUser = async (name: string, password) => {
    const user: IServerUser = await db.findOne(dbName, { name })
    if (!user) {
        return false
    }
    return authService.checkPassword(password, user.password)
}

function withoutPassword(user): IClientUser {
    const newContact: any = { ...user }
    delete newContact['password']
    return newContact
}
