import * as express from 'express'

import { authController } from '../controllers'

const router = express.Router()

router.post('/login', authController.login)
router.post('/join', authController.join)

export default router
