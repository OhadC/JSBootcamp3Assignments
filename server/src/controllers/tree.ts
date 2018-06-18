import { Request, Response } from 'express'

import { treeService } from '../services'

export const getTree = async (req: Request, res: Response) => {
    const tree = await treeService.getTree()
    res.json(tree)
}
