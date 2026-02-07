import roomCancelRequest from "../models/roomCancelRequest.js"


export const roomCancelRequestByGuest=async(req,res)=>{
  const cancelBookingRequestData=req.body
console.log("Received cancel request data:", cancelBookingRequestData)
  const cancelRequest=await roomCancelRequest.create(cancelBookingRequestData)

  res.status(201).json({
    message:"Room cancel request created successfully",
    cancelRequest
  })
}


export  const getAllRoomCancelRequests=async(req,res)=>{{
  const cancelRequests=await roomCancelRequest.find()

  res.status(200).json({
    message:"All room cancel requests retrieved successfully",
    cancelRequests
  })

}}