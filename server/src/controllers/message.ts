import { Request, Response } from 'express'

import { messageService } from '../services'
import { requestHandler } from './utils'

export const getAllMessages = requestHandler(
    messageService.getAllMessages
)

export const getMessagesById = requestHandler(
    (req: Request) => {
        const messageId = req.params.id
        return messageService.getMessagesOfGroup(messageId)
    }
)

export const addMessage = requestHandler(
    (req: Request) => {
        return messageService.addMessage(req.body)
    }
)
