import { db, IClientMessage, IServerMessage } from '../models'
import { getUserById } from './user'

const dbName = 'message'

export const getAllMessages = async () => {
    const messages: IServerMessage[] = await db.find(dbName)
    return Promise.all(messages.map(populateUser))
}

export const getMessagesOfGroup = async (groupId) => {
    if (!await db.findOne('group', { id: groupId })) {
        throw Error('No group with that ID, ' + groupId)
    }
    const messages: IServerMessage[] = await db.find(dbName, { groupId })
    return Promise.all(messages.map(populateUser))
}

export const addMessage = async (messageIn) => {
    const message: IServerMessage = await db.add(dbName, messageIn)
    return populateUser(message)
}

const populateUser = async (message: any): Promise<IClientMessage> => {
    message.user = await getUserById(message.userId)
    return message
}
