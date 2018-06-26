import { Request, Response } from 'express'

import { userService, groupService } from '../services'
import { requestHandlerFactory } from './utils'

export const getAllUsers = requestHandlerFactory(
    userService.getAllUsers
)

export const getUserById = requestHandlerFactory(
    (req: Request) => {
        const userId = req.params.id
        return userService.getUserById(userId)
    }
)

export const getAllGroupsById = requestHandlerFactory(
    (req: Request) => {
        const userId = req.params.id
        return groupService.getAllGroupsByUserId(userId)
    }
)

export const updateUser = requestHandlerFactory(
    (req: Request) => {
        const userId = req.params.id
        const newFields = req.body
        return userService.updateUser(userId, newFields)
    }
)

export const deleteUser = requestHandlerFactory(
    (req: Request) => {
        const userId = req.params.id
        return userService.deleteUser(userId)
    }
)
