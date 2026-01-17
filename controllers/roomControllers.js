export const addRoom = async (req, res) => {
  try {
    const roomData = req.body;

    const newRoom = new Room(roomData);

    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      data: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add room",
      error: error.message,
    });
  }
};
