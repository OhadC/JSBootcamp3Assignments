import * as _ from 'lodash'

import { IGroup, IServerGroup } from '../models'
import { messageService, userService } from '.'
import { Group } from '../models/mongoose/models'

export const getAllPublicGroups = async () =>
    Group.find({ isPrivate: false }).populate('users', '-password').lean()

export const getAllGroupsByUserId = async (userId) =>
    Group.find({ userIds: userId }).populate('users', '-password').lean()

export const getGroupById = async (id: string) => {
    const group: IServerGroup = await Group.findById(id).populate('users', '-password').lean()
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    return group
}

export const getPrivateGroup = async (parentGroupId, userId1, userId2) => {
    let group = await Group.findOne({ parentId: parentGroupId, isPrivate: true, userIds: { $all: [userId1, userId2] } })
        .populate('users', '-password').lean()
    if (group) {
        return group
    }

    await Promise.all([
        getGroupById(parentGroupId),
        userService.getUserById(userId1),
        userService.getUserById(userId2)
    ])

    const { _id } = await new Group({ parentId: parentGroupId, isPrivate: true, userIds: [userId1, userId2] }).save()
    return getGroupById(_id)
}

export const addGroup = async ({ parentId, name, userIds }: IGroup) => {
    if (parentId && !(await Group.findById(parentId))) {
        throw Error('No group with that ID, ' + parentId)
    }
    const { _id } = await new Group({ parentId, name, userIds, isPrivate: false }).save()
    return getGroupById(_id)
}

export const updateGroup = async (id: string, { name, userIds }: IGroup) => {
    const group: IServerGroup = await getGroupById(id)
    if (!group) {
        throw Error('No group with that ID, ' + id)
    }
    if (group.userIds) {
        const usersIdsRemoved = _.differenceBy(group.userIds, userIds, x => x.toString())
        const deletedGroupIds = await Group.find({ parentId: id, isPrivate: true, userIds: { $in: usersIdsRemoved } }, { _id: 1 }).lean()
        await Promise.all([
            Group.deleteMany({ parentId: id, isPrivate: true, userIds: { $in: usersIdsRemoved } }),
            Promise.all(deletedGroupIds.map(groupId => messageService.deleteAllMessagesOfgroup(groupId)))
        ])
    }
    await Group.findByIdAndUpdate(id, { name, userIds })
    return getGroupById(id)
}

export const deleteGroup = async (id: string) => {
    await getGroupById(id)

    const children = await Group.find({ parentId: id }).lean()
    Promise.all([
        messageService.deleteAllMessagesOfgroup(id),
        Group.deleteOne({ _id: id }),
        Promise.all(children.map(child => deleteGroup(child._id)))
    ])
    return "Group deleted"
}

export const removeUserFromAllGroups = async (userId: string) => {
    const allGroupsWithUser: IServerGroup[] = await Group.find({ userIds: userId }).lean()
    await Promise.all(
        allGroupsWithUser.map(group => {
            if (group.isPrivate) {
                deleteGroup(group._id)
            } else {
                Group.updateMany({ userIds: userId }, { $pull: { userIds: userId } })
            }
        })
    )
}
