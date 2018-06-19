import { db, IUser } from '../models'

const dbName = 'user'

export const getAllUsers = async () => {
    const users: IUser[] = await db.find(dbName)
    return users.map(toUserWithoutPassword)
}

export const getUserById = async (id: string) => {
    const user: IUser = await db.findOne(dbName, { id })
    return toUserWithoutPassword(user)
}

export const addUser = async (user: Object) => {
    await db.add('user', user)
    return toUserWithoutPassword(user)
}

export const updateUser = async (id: string, updatedUser: IUser) => {
    return db.update(dbName, { id }, updatedUser)
}

export const deleteUser = async (id: string) => {
    return db.delete(dbName, { id })
}

function toUserWithoutPassword(user) {
    const newContact: IUser = { ...user }
    delete newContact['password']
    return newContact
}
