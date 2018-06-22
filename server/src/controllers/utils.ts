import { Request, Response } from 'express'

export const requestHandler = (weraped) => {
    return async (req: Request, res: Response) => {
        try {
            const data = await weraped(req)
            res.json({
                status: "success",
                data
            })
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.toString()
            })
        }
    }
}
