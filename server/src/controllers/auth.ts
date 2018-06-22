import { Request, Response } from 'express'

import { authService } from '../services'
import { requestHandler } from './utils'

export const login = requestHandler(
    async (req: Request) => {
        const name = req.body.name
        const password = req.body.password
        return authService.login(name, password)
    }
)

export const join = async (req: Request, res: Response) => {
    const name = req.body.name
    const password = req.body.password
    res.json()
}
