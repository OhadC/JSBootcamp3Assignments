import * as express from 'express'

import { groupController } from '../controllers'

const router = express.Router()

router.get('/', groupController.getAllGroupsByUserId)
router.get('/all', groupController.getAllGroups)
router.get('/:id', groupController.getGroupById)
router.get('/:id/private/:userId', groupController.getPrivateGroup)
router.get('/:id/messages', groupController.getMessagesById)
router.post('/', groupController.addGroup)
router.put('/:id', groupController.updateGroup)
router.delete('/:id', groupController.deleteGroup)

export default router
