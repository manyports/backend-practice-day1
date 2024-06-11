// event-router.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import EventController from './event-controller';

const eventRouter = Router();

import EventService from './event-service';
const eventService = new EventService();
const eventController = new EventController(eventService);

eventRouter.get('/events/', authMiddleware, eventController.getEvents);
eventRouter.post('/events/', authMiddleware, eventController.createEvent);
eventRouter.get('/events/:id', authMiddleware, eventController.getEventById);

export default eventRouter;
