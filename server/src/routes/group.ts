import * as express from 'express'

import { groupController } from '../controllers'

const router = express.Router()

router.get('/', groupController.getAllGroups)
router.get('/:id', groupController.getAllGroupsByUserId)
router.get('/:id/messages', groupController.getMessagesById)
router.post('/', groupController.addGroup)
router.put('/:id', groupController.updateGroup)
router.delete('/:id', groupController.deleteGroup)

export default router
