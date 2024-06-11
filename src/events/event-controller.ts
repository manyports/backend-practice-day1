import { Request, Response } from 'express';
import EventService from './event-service';

class EventController {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const createEventDto = req.body;
            const event = await this.eventService.createEvent(createEventDto);
            res.status(201).json(event);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user) {
                res.status(400).send({ error: 'User not authenticated' });
                return;
            }

            const userCity = (req.user as any).city;

            const { page = '1', limit = '10', sortBy = 'date', sortDirection = 'asc' } = req.query;

            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            const events = await this.eventService.getEvents(userCity, pageNumber, limitNumber, sortBy as string, sortDirection as string);
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const event = await this.eventService.getEventById(id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.status(200).json(event);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default EventController;