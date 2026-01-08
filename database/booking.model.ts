import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Event ID is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        validate: {
          validator: function (email: string) {
            const emailRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return emailRegex.test(email);
          },
          message: "Please provide a valid email address",
        },
      },
    },
    { timestamps: true }
);

// ✅ pre-save hook (async ohne next) – Event muss existieren
BookingSchema.pre("save", async function () {
  const booking = this as IBooking;

  if (!booking.isNew && !booking.isModified("eventId")) return;

  const exists = await Event.exists({ _id: booking.eventId });
  if (!exists) {
    const err: any = new Error(`Event with ID ${booking.eventId} does not exist`);
    err.name = "ValidationError";
    throw err;
  }
});

// Indexes
BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: "uniq_event_email" });

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);
export default Booking;
