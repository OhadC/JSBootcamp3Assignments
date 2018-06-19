import { Request, Response } from 'express'

import { messageService } from '../services'

export const getAllMessages = async (req: Request, res: Response) => {
    const messages = await messageService.getAllMessages()
    res.json(messages)
}

export const getMessagesById = async (req: Request, res: Response) => {
    const messageId = req.params.id
    const message = await messageService.getMessagesOfGroup(messageId)
    res.json(message)
}

export const addMessage = async (req: Request, res: Response) => {
    const message = await messageService.addMessage(req.body)
    res.json(message)
}
