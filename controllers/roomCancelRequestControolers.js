import roomCancelRequest from "../models/roomCancelRequest.js";

export const roomCancelRequestByGuest = async (req, res) => {
  const cancelBookingRequestData = req.body;
  console.log("Received cancel request data:", cancelBookingRequestData);
  const cancelRequest = await roomCancelRequest.create(
    cancelBookingRequestData,
  );

  res.status(201).json({
    message: "Room cancel request created successfully",
    cancelRequest,
  });
};

export const getAllRoomCancelRequests = async (req, res) => {
  {
    const {hostEmail}=req.params
    const cancelRequests = await roomCancelRequest.find({hostEmail});

    res.status(200).json({
      message: "All room cancel requests retrieved successfully",
      cancelRequests,
    });
  }
};

//update status after host approves or rejects the cancel request
export const updateCancelRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedRequest = await roomCancelRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  res.status(200).json({
    message: "Cancel request status updated successfully",
    updatedRequest,
  });
};



//room cancel request can be seen by the requestd user

export const getCancelRequestsByUser = async (req, res) => {
  const {requestedByEmail}=req.params

  const cancelRequests=await roomCancelRequest.find({'requestedByInfo.email':requestedByEmail})

  res.status(200).json({
    message: "Cancel requests for the user retrieved successfully",
    cancelRequests,
  });
}