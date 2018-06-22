import { Request, Response } from 'express'

import { groupService, messageService } from '../services'
import { requestHandler } from './utils'

export const getAllGroups = requestHandler(
    groupService.getAllGroups
)

export const getGroupById = requestHandler(
    (req: Request) => {
        const groupId = req.params.id
        return groupService.getGroupById(groupId)
    }
)

export const getAllGroupsByUserId = requestHandler(
    (req: Request) => {
        const userId = req.params.id
        return groupService.getAllGroupsByUserId(userId)
    }
)

export const getMessagesById = requestHandler(
    (req: Request) => {
        const groupId = req.params.id
        return messageService.getMessagesOfGroup(groupId)
    }
)

export const addGroup = requestHandler(
    (req: Request) => {
        return groupService.addGroup(req.body)
    }
)

export const updateGroup = requestHandler(
    (req: Request) => {
        const groupId = req.params.id
        const newFields = req.body
        return groupService.updateGroup(groupId, newFields)
    }
)

export const deleteGroup = requestHandler(
    (req: Request) => {
        const groupId = req.params.id
        return groupService.deleteGroup(groupId)
    }
)
