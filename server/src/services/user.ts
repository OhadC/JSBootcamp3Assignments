import { db, IUser, IServerUser, IClientUser } from '../models'
import { authService, messageService, groupService } from '.'

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

export const addUser = async ({ name, password, age }) => {
    if (!!(await db.findOne(dbName, { name }))) {
        throw Error('User with that name already exists. ' + name)
    }
    password = await authService.getHashedPassword(password)
    const user: IServerUser = await db.add('user', { name, password, age })
    return withoutPassword(user)
}

export const updateUser = async (id: string, updatedFields: IUser) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No user with that ID, ' + id)
    }
    const updatedUser = await db.update(dbName, { id }, updatedFields)
    return withoutPassword(updatedUser)
}

export const deleteUser = async (id: string) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No user with that ID, ' + id)
    }
    await Promise.all([messageService.deleteAllMessagesOfUser(id), groupService.deleteUserFromAllGroups(id)])
    return db.delete(dbName, { id })
}

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
