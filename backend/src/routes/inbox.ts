import express, { Router } from 'express';
import { getInboxes, createInbox, patchInboxStatus, deleteInboxes } from '../controller/inbox';

const router: Router = express.Router();

router.get('/', getInboxes)
router.get('/:userId', getInboxes)
router.post('/', createInbox)
router.patch('/:inboxId', patchInboxStatus)
router.delete('/:inboxId', deleteInboxes)

export default router;