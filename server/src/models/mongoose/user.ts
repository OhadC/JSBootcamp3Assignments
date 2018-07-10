import { User } from './models'

export const getAllUsers = async () =>
    User.find()

export const getUserById = async (userId) =>
    User.findById(userId)

export const getUserByName = async (name: string) =>
    User.findOne({ name })

export const createUser = async (userFields) =>
    new User(userFields).save()

export const updateUser = async (userId: string, updatedFields) =>
    User.findByIdAndUpdate(userId, updatedFields)

export const deleteUser = async (userId) =>
    User.findByIdAndRemove(userId)
