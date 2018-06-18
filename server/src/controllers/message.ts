import { Request, Response } from 'express'

import { messageService } from '../services'

export const getAllMessages = async (req: Request, res: Response) => {
    const Groups = await messageService.getAllMessages()
    res.json(Groups)
}

export const getMessagesById = async (req: Request, res: Response) => {
    const groupId = req.params.id
    const group = await messageService.getMessagesOfGroup(groupId)
    res.json(group)
}

export const addMessage = async (req: Request, res: Response) => {
    const group = await messageService.addMessage(req.body)
    res.json(group)
}
