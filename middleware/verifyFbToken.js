const admin = require("firebase-admin");

const serviceAccount = require("../villa-x-firebase-token-verification.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyFbToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req, "this is req without decoded");
  const token = authHeader.split(" ")[1];

  if (!authHeader || !token) {
    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }
  //verify tooken
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    console.log(req, "this is req after decoded initialize",decoded,'this is decoded');
      next();
  } catch (error) {
    console.log(error, "verify error");
    return res.status(403).send({
      message: "Forbidden Access",
      error,
    });
  }

};
