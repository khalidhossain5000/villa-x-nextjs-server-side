import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import roomCancelRoutes from './routes/roomCancelRoutes.js'
import statsRoutes from './routes/statsRoutes.js'
// Configure dotenv
dotenv.config();

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);
//user registertation
app.use("/api/auth", authRoutes);


//room related api starts over here
app.use("/api",roomRoutes)



//stripe payment routes
app.use('/api/payments',paymentRoutes)

//room booking realted routes here
app.use("/api", bookingRoutes);

//room cancel req here routes
app.use("/api",roomCancelRoutes)

//stats data get routes
app.use('/api/stats',statsRoutes)
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
  res.send('Hello World! this is villa x server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${process.env.mongoDB_uri}`)
})