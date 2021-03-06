import { IUser, IClientUser } from '../models'
import { authService, messageService, groupService } from '.'
import { User } from '../models/mongoose/models'

export const getAllUsers = async (): Promise<IClientUser[]> => {
    return User.find({}, { password: 0 }).lean()
}

export const getUserById = async (_id: string) => {
    const user: IClientUser = await User.findOne({ _id }, { password: 0 }).lean()
    if (!user) {
        throw Error('No user with that ID, ' + _id)
    }
    return user
}

export const getUserByName = async (name: string) => {
    const user: IClientUser = await User.findOne({ name }, { password: 0 }).lean()
    if (!user) {
        throw Error('No user with that name, ' + name)
    }
    return user
}

export const addUser = async ({ name, password, age }) => {
    if (!!(await User.findOne({ name }))) {
        throw Error('User with that name already exists. ' + name)
    }
    password = await authService.getHashedPassword(password)
    const userDocument = await new User({ name, password, age }).save()
    return getUserById(userDocument._id)
}

export const updateUser = async (id: string, { age }: IUser) => {
    await getUserById(id)

    await User.findByIdAndUpdate(id, { age }).select({ password: 0 }).lean()
    return getUserById(id)
}

export const deleteUser = async (id: string) => {
    await getUserById(id)

    await Promise.all([messageService.deleteAllMessagesOfUser(id), groupService.removeUserFromAllGroups(id)])
    return User.findByIdAndRemove(id).select({ password: 0 }).lean()
}

export const validateUser = async (name: string, password) => {
    const user: any = await User.findOne({ name }).lean()
    if (!user) {
        return false
    }
    return authService.checkPassword(password, user.password)
}
