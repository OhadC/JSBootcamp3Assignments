import { Group, User, Message } from './models'
import { IServerGroup } from '../interfaces';

export const getAllGroups = async () =>
    Group.find()

export const getGroupById = async (_id: string) =>
    Group.find({ _id })

export const getGroupsByUserId = async (userId: string) =>
    Group.find({ userIds: userId })

export const createGroup = async (groupFields: IServerGroup) =>
    await new Group(groupFields).save()

export const updateGroup = async (groupId: string, updatedFields: IServerGroup) =>
    Group.findByIdAndUpdate(groupId, updatedFields)

export const deleteGroupById = async (_id: string) =>
    Group.findByIdAndRemove(_id)

export const deletePrivateGroups = async (parentId: string, userId: string) =>
    Group.deleteMany({ parentId, userIds: userId })

export const removeUserFromAllGroups = async (userId: string) =>
    Group.updateMany({ userIds: userId }, { $pull: { userIds: userId } })
