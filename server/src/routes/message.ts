import * as express from 'express'

import { messageController } from '../controllers'

const router = express.Router()

router.get('/', messageController.getAllMessages)
router.get('/:id', messageController.getMessagesById)
router.post('/', messageController.addMessage)
// router.put('/:id', messageController.updateMessage)
// router.delete('/:id', messageController.deleteMessage)

export default router
