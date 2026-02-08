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


export const getBookedDatesByRoom = async (req, res) => {
  const { roomId } = req.params;

  const bookings = await bookingInfo.find({
    roomId,
    status: "reserved",
  }).select("from to -_id");

  res.send(bookings);
};



export const getMyBookings=async(req,res)=>{
  const {email}=req.params

  const myBookings = await bookingInfo.find({'guest.email':email})

  res.status(200).json({
    message:"My Bookings",
    myBookings
  })
}





//delte booking upon host approval of cancel request
export const deleteBooking=async(req,res)=>{
  const {bookingId}=req.params

  const deletedBooking=await bookingInfo.findByIdAndDelete(bookingId)

  res.status(200).json({
    message:"Booking deleted successfully",
    deletedBooking
  })
}


