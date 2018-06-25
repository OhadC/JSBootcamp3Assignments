import { Request, Response } from 'express'

import { messageService } from '../services'
import { requestHandlerFactory } from './utils'

export const getAllMessages = requestHandlerFactory(
    messageService.getAllMessages
)

export const getMessagesById = requestHandlerFactory(
    (req: Request) => {
        const messageId = req.params.id
        return messageService.getMessagesOfGroup(messageId)
    }
)

export const addMessage = requestHandlerFactory(
    (req: Request) => {
        return messageService.addMessage(req.body)
    }
)
