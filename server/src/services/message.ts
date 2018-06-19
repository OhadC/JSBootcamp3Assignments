import { db } from '../models'

const dbName = 'message'

export const getAllMessages = async () => {
    return db.find(dbName)
}

export const getMessagesOfGroup = async (groupId) => {
    return db.find(dbName, { groupId })
}

export const addMessage = async (message) => {
    const newMessage =  await db.add(dbName, message)
    return newMessage
}
