import admin from "firebase-admin";
import dotenv from 'dotenv'
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);






admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyFbToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  const token = authHeader.split(" ")[1];
console.log(token,'this is token')
  if (!authHeader || !token) {
    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }



  //verify tooken
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
      next();
  } catch (error) {
    console.log(error, "verify error");
    return res.status(403).send({
      message: "Forbidden Access",
      error,
    });
  }

};
