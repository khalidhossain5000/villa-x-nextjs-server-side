import roomData from "../models/room.js";

export const addRoom = async (req, res) => {
  try {
    const rooms = req.body;

    const newRoom = new roomData(rooms);

    const savedRoom = await newRoom.save();
    console.log(rooms, "this is room data from controllers");
    res.status(201).json({
      success: true,
      message: "Room added successfully",
      data: savedRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add room",
      error: error.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const { category,email } = req.query;

    let query = {};
    console.log(category, email,"this is category", query, "this is query",req.query,'this is whole query');
    if (category && category !=='null') {
      query.category = category;
    }
    if (email) {
          query["hostInfo.email"] = email;
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
