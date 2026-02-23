import { Router } from 'express';
import { getEvents } from '../controller/event';

const router = Router()

router.get('/', getEvents)

export default router;