import express, { Router } from 'express';
import messageRoutes from './message';
import inboxRoutes from './inbox';
import eventRoutes from './events'

const router: Router = express.Router();

router.use('/messages', messageRoutes);
router.use('/inboxes', inboxRoutes);
router.use('/events', eventRoutes)

export default router;
