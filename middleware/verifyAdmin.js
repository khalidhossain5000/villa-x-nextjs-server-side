import User from "../models/auth.js";


export const verifyAdmin = async (req, res, next) => {
  
  const adminEmail = req.decoded.email;

  try {
    const user = await User.findOne({ email: adminEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    next();
  } catch (error) {
    console.log(error, "verify admin error");
    return res.status(403).send({
      message: "Forbidden Access",
      error,
    });
  }
};
