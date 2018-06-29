import { db, IServerConversation } from '../models'
import { messageService } from '.'

const dbName = 'conversation'

export const getAllConversations = async () => {
    return db.find(dbName)
}

export const getConversationOfGroup = async (groupId: string) => {
    const conversation: IServerConversation = await db.findOne(dbName, { parentId: groupId })
    return conversation || createNewConversation('group', [groupId])
}

export const getConversationOfUsers = async (userId1: string, userId2: string) => {
    const conversations: IServerConversation = await db.findOne(dbName, { parentIds: [userId1, userId2] })
    return conversations || await createNewConversation('user', [userId1, userId2])
}

export const getAllConversationsOfUser = async (userId): Promise<IServerConversation[]> => {
    return db.find(dbName, { parentId: userId })
}

export const deleteConversation = async (id: string) => {
    return Promise.all([
        db.delete(dbName, { id }),
        messageService.deleteAllMessagesOfConversation(id)
    ])
}

export const deleteConversationByParentIds = async (parentIds: string | string[]) => {
    const conversations = await db.find(dbName, { parentIds })
    return Promise.all([
        Promise.all(conversations.map(conversation => messageService.deleteAllMessagesOfConversation(conversation.id))),
        db.delete(dbName, { parentIds })
    ])
}

export const createNewConversation = async (ofType: "group" | "user", parentIds: string[]): Promise<IServerConversation> => {
    const newConversation = {
        ofType,
        parentIds
    }
    return db.add(dbName, newConversation)
}
