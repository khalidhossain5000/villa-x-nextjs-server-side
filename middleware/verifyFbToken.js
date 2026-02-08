import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyFbToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log(token, "this is token");
  if (!token) {
    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }

  //verify tooken
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error, "verify error inside fb token");
    return res.status(403).send({
      message: "Forbidden Access",
      error,
    });
  }
};
