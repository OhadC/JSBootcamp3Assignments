import { Message } from '../models/mongoose/models'

export const getAllMessages = async () =>
    Message.find().populate('user', '-password').lean()

export const getMessagesOfGroup = async (groupId) =>
    Message.find({ groupId }).populate('user', '-password').lean()

export const getMessageById = async (id) =>
    Message.findById(id).populate('user', '-password').lean()

export const addMessage = async ({ groupId, userId, content, date }) => {
    const { _id } = await new Message({ groupId, userId, content, date }).save()
    return getMessageById(_id)
}
export const deleteAllMessagesOfUser = async (userId) =>
    Message.deleteMany({ userId })

export const deleteAllMessagesOfgroup = async (groupId) =>
    Message.deleteMany({ groupId })
