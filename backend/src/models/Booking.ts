import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId?: mongoose.Types.ObjectId | string;
    serviceName?: string;
    price?: number;
    status: 'pending' | 'confirmed' | 'cancelled';

    fullName?: string;
    email?: string;
    phone?: string;
    destination?: string;
    departureDate?: Date;
    returnDate?: Date;
    travelersCount?: number;
    specialRequests?: string;

    name?: string;
    guests?: number;
    date?: Date;

    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    serviceName: { type: String },
    price: { type: Number },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },

    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    destination: { type: String },
    departureDate: { type: Date },
    returnDate: { type: Date },
    travelersCount: { type: Number },
    specialRequests: { type: String },

    name: { type: String },
    guests: { type: Number },
    date: { type: Date },

    createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
