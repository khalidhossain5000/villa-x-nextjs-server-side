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
      userRole: userRole, // default role,
      status: "verified",
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

//get user more info for profile from db
export const getUserInfo = async (req, res) => {
  try {
    const { email } = req.query;

    // validation
    if (!email) {
      return res.status(400).json({ error: "Email query is required" });
    }

    // find user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // response
    res.status(200).json({
    singleUser:user,
    message:"user data fetched successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
//get user data for frontend
export const getUserData = async (req, res) => {
  try {
    const user = await User.find({});
    res
      .status(200)
      .json({ message: "user data fetched successfully", userData: user });
  } catch (error) {
    console.log(error, "get user data u error");

    res.status(500).json({ error: "server error", errorMessage: error });
  }
};

// patch request for requested user for beacoming host over here

export const updateUser = async (req, res) => {
  console.log(req.body, "this isre", req.params);
  try {
    const { userEmail } = req.params;
    const userStaus = await User.find({ email: userEmail });

    if (userStaus[0].status ==="requested")
      return res.status(400).json({ error: "already requested once" });
   

    const result = await User.findOneAndUpdate({ email: userEmail }, req.body, {
      new: true,
    });
   res.status(200).json({ message: "user updated successfully",updatedUser: result });
  } catch (error) {
    console.log(error, "patch error");

    res.status(500).json({ error: "server error", errorMessage: error });
  }
};


//PATCH REQUST FOR MAKING USER ROLE TO HOST AND ADMINA DN REMOVING HOST SECURITY FOR ADMIN ONLY MIDDLEWARE WILL BE ADDED HERE AND WILL FIX IT SON 

export const updateUserRoleAdminApi=async(req,res)=>{

  try{
    const {id}=req.params
    const {role}=req.body

    const result=await User.findByIdAndUpdate(id,{userRole:role,status:'verified'},{new:true})

    res.status(200).json({message:"user role updated successfully",updatedUser:result})
  }
  catch (error) {
    console.log(error, "patch error");

    res.status(500).json({ error: "server error", errorMessage: error });
  }
}