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



// Get user role by email
export const getUserRole = async (req, res) => {
  try {
    const { email } = req.query;

    // validation
    if (!email) {
      return res.status(400).json({ error: "Email query is required" });
    }

    // find user
    const user = await User.findOne({ email }).select("email userRole");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // response
    res.status(200).json({
      email: user.email,
      userRole: user.userRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};