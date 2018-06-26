import * as express from 'express'

import { userController } from '../controllers'

const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.get('/:id/groups', userController.getAllGroupsById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
