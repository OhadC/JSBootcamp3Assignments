import { db, IMessage } from '../models'

const dbName = 'message'

export const getAllMessages = async (): Promise<IMessage[]> => {
    return db.find(dbName)
}

export const getMessagesOfGroup = async (groupId): Promise<IMessage[]> => {
    return db.find(dbName, { groupId })
}

export const addMessage = async (message) => {
    return db.add(dbName, message)
}
