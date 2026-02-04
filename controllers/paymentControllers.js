import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);

//create payment inter for stripe

export const createStripePaymentIntent=async(req,res)=>{
    try{
        const {price} =req.body
    }
}