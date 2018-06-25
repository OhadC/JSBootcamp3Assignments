import { Request, Response } from 'express'

export const requestHandlerFactory = (wrapped: (req?: Request) => any | Promise<any>) => {
    return async (req: Request, res: Response) => {
        try {
            const data = await wrapped(req)
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
