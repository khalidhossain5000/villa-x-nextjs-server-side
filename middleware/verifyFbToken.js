export const verifyFbToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization

    const token=authHeader.split(' ')[1]

    if(!authHeader || !token) {
        return res.status(401).send({
            message:'Unauthorized Access'
        })
    }
  //verify tooken

    next()
}