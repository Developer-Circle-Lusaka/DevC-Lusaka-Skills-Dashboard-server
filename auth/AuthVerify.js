import jwt from 'jsonwebtoken'
import config from '../config'

export const TokenVerify=(req,res,next)=>{
   const  token = req.headers['x-access-token'];
   /**
       check to see if token exists
       */
      if(!token) return res.status(401).json({status:false,message:'No access Token'})
    
      //if token exists verify it and return data if token is verified.
      jwt.verify(token,config.secret,(err,decoded)=>{
      if(err) return res.status(401).json({status:false,message:'Failed to verify Token'})

        req.userId=decoded._id;
        next()
    

     })
}