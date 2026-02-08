export const verifyFbToken=async(req,res,next)=>{
    const fbToken=req.headers
console.log('hello from middleware')
    console.log("Received FB token: in middleware", fbToken);

    next()
}