import { Request, Response } from 'express'

import { groupService, messageService } from '../services'
import { requestHandlerFactory } from './utils'

export const getAllGroups = requestHandlerFactory(
    groupService.getAllGroups
)

export const getGroupById = requestHandlerFactory(
    (req: Request) => {
        const groupId = req.params.id
        return groupService.getGroupById(groupId)
    }
)

export const getAllGroupsByUserId = requestHandlerFactory(
    (req: Request) => {
        const userId = req.user.id
        return groupService.getAllGroupsByUserId(userId)
    }
)

export const getPrivateGroup = requestHandlerFactory(
    (req: Request) => {
        const groupId = req.params.id
        const userId1 = req.user.id
        const userId2 = req.params.userId
        return groupService.getPrivateGroup(groupId, userId1, userId2)
    }
)

export const getMessagesById = requestHandlerFactory(
    (req: Request) => {
        const groupId = req.params.id
        return messageService.getMessagesOfGroup(groupId)
    }
)

export const addGroup = requestHandlerFactory(
    (req: Request) => {
        return groupService.addGroup(req.body)
    }
)

export const updateGroup = requestHandlerFactory(
    (req: Request) => {
        const groupId = req.params.id
        const newFields = req.body
        return groupService.updateGroup(groupId, newFields)
    }
)

export const deleteGroup = requestHandlerFactory(
    (req: Request) => {
        const groupId = req.params.id
        return groupService.deleteGroup(groupId)
    }
)
