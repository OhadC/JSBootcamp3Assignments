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
        const userId = req.params.id // TODO: req.user.id
        return groupService.getAllGroupsByUserId(userId)
    }
)

export const getMessagesById = requestHandlerFactory(
    (req: Request) => {
        console.log(req.user)
        const groupId = req.params.id
        return groupService.getMessagesById(groupId)
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
