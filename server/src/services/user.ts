import { db, IUser, IServerUser, IClientUser } from '../models'
import { authService } from '.';

const dbName = 'user'

export const getAllUsers = async () => {
    const users: IServerUser[] = await db.find(dbName)
    return users.map(toUserWithoutPassword)
}

export const getUserById = async (id: string) => {
    const user: IServerUser = await db.findOne(dbName, { id })
    return toUserWithoutPassword(user)
}

export const getUserByName = async (name: string) => {
    const user: IServerUser = await db.findOne(dbName, { name })
    return toUserWithoutPassword(user)
}

export const addUser = async (name, password) => {
    const user: IServerUser = await db.add('user', { name, password })
    return toUserWithoutPassword(user)
}

export const updateUser = async (id: string, updatedUser: IUser) => {
    const updatedUserFromDb = db.update(dbName, { id }, updatedUser)
    return toUserWithoutPassword(updatedUserFromDb)
}

export const deleteUser = async (id: string) => {
    return db.delete(dbName, { id })
}

export const validateUser = async (name: string, password) => {
    const user: IServerUser = await db.findOne(dbName, { name })
    return authService.checkPassword(password, user.password)
}

function toUserWithoutPassword(user): IClientUser {
    const newContact: any = { ...user }
    delete newContact['password']
    return newContact
}
