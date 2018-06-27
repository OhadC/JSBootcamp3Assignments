import { db, IUser, IServerUser, IClientUser } from '../models'
import { authService } from '.'

const dbName = 'user'

export const getAllUsers = async () => {
    const users: IServerUser[] = await db.find(dbName)
    return users.map(toUserWithoutPassword)
}

export const getUserById = async (id: string) => {
    const user: IServerUser = await db.findOne(dbName, { id })
    if (!user) {
        throw Error('No user with that ID, ' + id)
    }
    return toUserWithoutPassword(user)
}

export const getUserByName = async (name: string) => {
    const user: IServerUser = await db.findOne(dbName, { name })
    if (!user) {
        throw Error('No user with that name, ' + name)
    }
    return toUserWithoutPassword(user)
}

export const addUser = async (name, password) => {
    if (!!(await db.findOne(dbName, { name }))) {
        throw Error('User with that name already exists. ' + name)
    }
    const user: IServerUser = await db.add('user', { name, password })
    return toUserWithoutPassword(user)
}

export const updateUser = async (id: string, updatedUser: IUser) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No user with that ID, ' + id)
    }
    const updatedUserFromDb = db.update(dbName, { id }, updatedUser)
    return toUserWithoutPassword(updatedUserFromDb)
}

export const deleteUser = async (id: string) => {
    if (!(await db.findOne(dbName, { id }))) {
        throw Error('No user with that ID, ' + id)
    }
    return db.delete(dbName, { id })
}

export const validateUser = async (name: string, password) => {
    const user: IServerUser = await db.findOne(dbName, { name })
    if (!user) {
        return false
    }
    return authService.checkPassword(password, user.password)
}

function toUserWithoutPassword(user): IClientUser {
    const newContact: any = { ...user }
    delete newContact['password']
    return newContact
}
