import mongoose from "mongoose";

const bookingInfoSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    guest: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      image: { type: String },
    },

    hostName: {
      type: String,
      required: true,
    },

    hostEmail: {
      type: String,
      required: true,
    },

    from: {
      type: Date,
      required: true,
    },

    to: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["reserved", "completed", "cancelled"],
      default: "reserved",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    stripePaymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookingInfo", bookingInfoSchema);
