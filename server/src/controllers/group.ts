import { Request, Response } from 'express'

import { groupService, messageService } from '../services'

export const getAllGroups = async (req: Request, res: Response) => {
    const Groups = await groupService.getAllGroups()
    res.json(Groups)
}

export const getGroupById = async (req: Request, res: Response) => {
    const groupId = req.params.id
    const group = await groupService.getGroupById(groupId)
    res.json(group)
}

export const getAllGroupsByUserId = async (req: Request, res: Response) => {
    const userId = req.params.id
    const groups = await groupService.getAllGroupsByUserId(userId)
    res.json(groups)
}

export const getMessagesById = async (req: Request, res: Response) => {
    const groupId = req.params.id
    const messages = await messageService.getMessagesOfGroup(groupId)
    res.json(messages)
}

export const addGroup = async (req: Request, res: Response) => {
    const group = await groupService.addGroup(req.body)
    res.json(group)
}

export const updateGroup = async (req: Request, res: Response) => {
    const groupId = req.params.id
    const newFields = req.body
    const group = await groupService.updateGroup(groupId, newFields)
    res.json(group)
}

export const deleteGroup = async (req: Request, res: Response) => {
    const groupId = req.params.id
    const result = await groupService.deleteGroup(groupId)
    res.json(result)
}
