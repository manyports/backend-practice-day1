import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    description: string;
    date: Date;
    location: string;
    duration: number;
    city: string;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    duration: { type: Number, required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);