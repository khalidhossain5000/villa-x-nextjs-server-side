import User from "../models/auth.js";


export const verifyHost = async (req, res, next) => {
  
  const hostEmail = req.decoded.email;

  try {
    const user = await User.findOne({ email: hostEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userRole !== "host") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    next();
  } catch (error) {
    console.log(error, "verify Host error");
    return res.status(403).send({
      message: "Forbidden Access",
      error,
    });
  }
};
