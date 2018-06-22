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
            const { resCode, message } = error
            res.status(resCode).json({
                status: "error",
                message
            })
        }
    }
}

requestHandler(
    (req: Request) => {
    }
)
