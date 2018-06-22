import { Request, Response } from 'express'

import { authService } from '../services'

export const login = async (req: Request, res: Response) => {
    const name = req.body.name
    const password = req.body.password
    const token = await authService.login(name, password)
    res.json(token)
}

export const join = async (req: Request, res: Response) => {
    const name = req.body.name
    const password = req.body.password
    res.json()
}
