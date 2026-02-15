import roomData from "../models/room.js";

export const addRoom = async (req, res) => {
  try {
    const rooms = req.body;

    const newRoom = new roomData(rooms);

    const savedRoom = await newRoom.save();
    console.log(rooms, "this is room data from controllers",newRoom,'this are');
    res.status(201).json({
      success: true,
      message: "Room added successfully",
      data: savedRoom,
    });
  } catch (error) {
    console.log(error,'this is room add error');
    res.status(500).json({
      success: false,
      message: "Failed to add room",
      error: error.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const { category,email,search } = req.query;
    let query = {};
   
    if (category && category !=='null') {
      query.category = category;
    }
    if (email) {
          query["hostInfo.email"] = email;
    }

    if(search){
      query.title={
        $regex:search,
        $options:'i'
      }
    }
  
    const allRoomData = await roomData.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      allRoomData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};









export const delteMyListingRoom=async(req,res)=>{
  const id=req.params.id
  console.log(req,'id to be delteds',id)
  
  const result =await roomData.findByIdAndDelete(id)
  res.send({result,message:'room delted successfully here over'})
}