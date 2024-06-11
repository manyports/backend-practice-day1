import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

class EventService {

    async getEventById(id: string): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEvents(userCity: string, page: number, limit: number, sortBy: string, sortDirection: string): Promise<IEvent[]> {
        const skip = (page - 1) * limit;
        const sort : any = { [sortBy]: sortDirection === 'desc' ? -1 : 1 };
        return await EventModel.find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();

    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const { name, description, date, location, duration } = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date: new Date(date),
            location,
            duration
        });

        await newEvent.save();
        return newEvent;
    }
}

export default EventService;
