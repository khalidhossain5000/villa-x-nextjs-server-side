import mongoose from "mongoose";

const roomCancelRequestSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    requestedByInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    hostEmail: {
      type: String,
      required: true,
    },
    cancelReason:{
      type:String
    },
    status: {
      type: String,
      enum: ["requested", "approved", "rejected"],
      default: "requested",
    },
  },
  { timestamps: true },
);

export default mongoose.model("RoomCancelRequest", roomCancelRequestSchema);
