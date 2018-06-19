import { db, IMessage, IUser } from '../models'

const dbName = 'message'

export const getAllMessages = async (): Promise<IMessage[]> => {
    const messages: IMessage[] = await db.find(dbName)
    return Promise.all(messages.map(populateUser))
}

export const getMessagesOfGroup = async (groupId): Promise<IMessage[]> => {
    const messages: IMessage[] = await db.find(dbName, { groupId })
    return Promise.all(messages.map(populateUser))
}

export const addMessage = async (message) => {
    return db.add(dbName, message)
}

const populateUser = async (message: IMessage) => {
    message.user = await getUserById(message.userId)
    return message

    async function getUserById(id): Promise<IUser> {
        return db.findOne('user', { id })
    }
}
