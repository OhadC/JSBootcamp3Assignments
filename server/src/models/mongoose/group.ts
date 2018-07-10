import { Group } from './models'

export const getAllGroups = async () =>
    Group.find()

export const getGroupById = async (groupId: string) =>
    Group.findById(groupId)

export const getGroupsByUserId = async (userId: string) =>
    Group.find({ userIds: userId })

export const createGroup = async (groupFields) =>
    new Group(groupFields).save()

export const updateGroup = async (groupId: string, updatedFields) =>
    Group.findByIdAndUpdate(groupId, updatedFields)

export const deleteGroupById = async (groupId: string) =>
    Group.findByIdAndRemove(groupId)

export const deletePrivateGroups = async (parentId: string, userId: string) =>
    Group.deleteMany({ parentId, userIds: userId })

export const removeUserFromAllGroups = async (userId: string) =>
    Group.updateMany({ userIds: userId }, { $pull: { userIds: userId } })
