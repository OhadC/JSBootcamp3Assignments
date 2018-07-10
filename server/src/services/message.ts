import { jsonDb, IClientMessage, IServerMessage } from '../models'
import { getUserById } from './user'

const dbName = 'message'

export const getAllMessages = async () => {
    const messages: IServerMessage[] = await jsonDb.find(dbName)
    return Promise.all(messages.map(WithUser))
}

export const getMessagesOfGroup = async (groupId) => {
    if (!await jsonDb.findOne('group', { id: groupId })) {
        throw Error('No group with that ID, ' + groupId)
    }
    const messages: IServerMessage[] = await jsonDb.find(dbName, { groupId })
    return Promise.all(messages.map(WithUser))
}

export const addMessage = async (messageIn) => {
    const message: IServerMessage = await jsonDb.add(dbName, messageIn)
    return WithUser(message)
}

export const deleteAllMessagesOfUser = async (userId) => {
    await jsonDb.delete(dbName, { userId })
}

export const deleteAllMessagesOfgroup = async (groupId) => {
    await jsonDb.delete(dbName, { groupId })
}

const WithUser = async (message: any): Promise<IClientMessage> => {
    message.user = await getUserById(message.userId)
    return message
}
