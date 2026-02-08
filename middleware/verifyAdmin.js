








// export const verifyAdmin = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   console.log('hello this is req decoded over here',req.decoded,'this decoded from req')

//   if (!authHeader ) {
//     return res.status(401).send({
//       message: "Unauthorized Access",
//     });
//   }
//   const token = authHeader.split(" ")[1];

//   if (!token ) {
//     return res.status(401).send({
//       message: "Unauthorized Access",
//     });
//   }




//   //verify tooken
//   try {
    
   
      
//   } 
// next();
// };


export const verifyAdmin=async(req,res,next)=>{
     console.log('hello this is req decoded over here',req.decoded,'this decoded from req')
     const adminEmail=req.decoded.email
try{
    
}


catch (error) {
    console.log(error, "verify admin error");
    return res.status(403).send({
      message: "Forbidden Access",
      error,
    });
  }
     next()
}