import User from "../models/auth.js";

// Registration Controller
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, userRole } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user object
    const newUser = new User({
      fullName,
      email,
      userRole: userRole , // default role
      createdAt: new Date(),
    });

    // Save user to MongoDB
    await newUser.save();

    //  Respond back
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
