import { db, IClientMessage, IServerMessage } from '../models'
import { getUserById } from './user'

const dbName = 'message'

export const getAllMessages = async () => {
    const messages: IServerMessage[] = await db.find(dbName)
    return Promise.all(messages.map(withUser))
}

export const getMessagesOfConversation = async (conversationId) => {
    const messages: IServerMessage[] = await db.find(dbName, { conversationId })
    return Promise.all(messages.map(withUser))
}

export const addMessage = async ({ conversationId, userId, content, date }) => {
    const message: IServerMessage = await db.add(dbName, { conversationId, userId, content, date }) // TODO: server date
    return withUser(message)
}

export const deleteAllMessagesOfConversation = (conversationId) => {
    return db.delete(dbName, { conversationId })
}

const withUser = async (message: any): Promise<IClientMessage> => {     // TODO: do this on client
    message.user = await getUserById(message.userId)
    return message
}
