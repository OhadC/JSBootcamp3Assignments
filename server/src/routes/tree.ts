import * as express from 'express'

import { treeController } from '../controllers'

const router = express.Router()

router.get('/', treeController.getTree)

export default router
