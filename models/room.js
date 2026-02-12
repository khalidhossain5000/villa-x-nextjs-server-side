import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total_guest: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // roomImage: {
    //   type: String,
    //   required: true,
    // }, 
    thumbnailImage: {
      type: String,
    
    },
    roomImages: {
      type: [String],
      default: [],
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    hostInfo: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      photoUrl: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

const RoomData = mongoose.model("RoomData", roomSchema);

export default RoomData;
