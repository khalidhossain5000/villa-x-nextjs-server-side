import bookingInfo from "../models/bookingInfo.js";


export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
console.log("Received booking data:", bookingData)
    //  Date overlap check (IMPORTANT)
    const conflict = await bookingInfo.findOne({
      roomId: bookingData.roomId,
      status: "reserved",
      $or: [
        {
          from: { $lte: bookingData.to },
          to: { $gte: bookingData.from },
        },
      ],
    });

    if (conflict) {
      return res.status(409).json({
        message: "Room is already booked for these dates",
      });
    }

    // 2️⃣ Save booking
    const booking = await bookingInfo.create(bookingData);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed", error });
  }
};
