import express, { Router } from 'express';
import { getMessages, getMessageById, createMessage, updateMessage, deleteMessage } from '../controller/message';

const router: Router = express.Router();

router.get('/', getMessages)
router.get('/:messageId', getMessageById)
router.post('/', createMessage)
router.put('/', updateMessage)
router.delete('/:messageId', deleteMessage)

export default router;