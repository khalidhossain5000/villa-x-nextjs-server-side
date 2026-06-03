import User from "../models/auth.js";

// Registration Controller
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, userRole } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser,'this is exisitng user')
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
// controllers/authController.js
export const socialLogin = async (req, res) => {
  try {
    const { fullName, email, image } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // 1. Check existing
    let user = await User.findOne({ email });

    if (!user) {
      // 2. Create new
      user = new User({
        fullName,
        email,
        image,
        userRole: "guest",
        status: "verified",
      });

      await user.save();
    }

    // 3. Always success response
    return res.status(200).json({
      message: "Social login success",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// Get user role by email
export const getUserRole = async (req, res) => {
  console.log('user role has been hitted')
  try {
    const { email } = req.params;
console.log(email,'inside get user role controller here','get role hitedn')
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

//update name

export const updateName = async (req, res) => {
  console.log(req.user,'this user',req.params,req.name,'name and params')
  try {
    const { email } = req.params; // email from URL params
    const { name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required in params",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // find user by email and update fullName
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { fullName: name },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Name updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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