import Stripe from "stripe";
import dotenv from 'dotenv'
// Configure dotenv
dotenv.config();
console.log(process.env.STRIPE_KEY,'this is key')
const stripe = new Stripe(process.env.STRIPE_KEY);


//create payment inter for stripe

export const createStripePaymentIntent=async(req,res)=>{
    try{
        const {price} =req.body
             
      if (!price || amount < 1) return res.status(400).json({ message: "Invalid amount" });
      const { client_secret } = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      })

      console.log('stripe payment intetn sectionrer',client_secret)

      res.send({clientSecret:client_secret})
    }
    catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ message: "Payment creation failed", error });
  }
}