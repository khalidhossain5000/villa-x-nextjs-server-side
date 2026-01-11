import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
// Configure dotenv
dotenv.config();

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
//mongoDb and mongoose connection starts here

try{
    const db=await mongoose.connect(process.env.mongoDb_uri)
     console.log("MongoDB connected:", db.connection.host);
}
catch (error) {
    console.error("MongoDB connection error:", error);
}

// Mount and connection stablished  routes



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${process.env.mongoDB_uri}`)
})