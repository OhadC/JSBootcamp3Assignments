import { Request, Response } from 'express'

import { authService } from '../services'
import { requestHandlerFactory } from './utils'

export const login = requestHandlerFactory(
    async (req: Request) => {
        const name = req.body.name
        const password = req.body.password
        return authService.login(name, password)
    }
)

export const join = async (req: Request, res: Response) => {    // TODO: this
    const name = req.body.name
    const password = req.body.password
    res.json()
}
