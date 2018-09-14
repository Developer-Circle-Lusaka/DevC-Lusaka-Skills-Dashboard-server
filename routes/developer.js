import express from 'express'
import {hash,compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
const router= express.Router();
import developer from '../models/developer'
import config from '../config'

// route gets a list of the developers from the database 
router.get('/developers',async(req,res)=>{
    const token=req.headers['x-access-token']
  try {
      /**
       check to see if token exists
       */
     if(!token) return res.status(401).json({status:false,message:'No access Token'})
    
     //if token exists verify it and return data if token is verified.
    const result= await jwt.verify(token,config.secret)
    if(result){
        const developers= await developer.find({}).select('-password').exec()
        const response={
            status:true,
            data:developers
        }
       return res.status(200).json(response)
    }

  } catch (error) {
    const response={
        status:false,
        error:`Something went wrong: ${error.message}`
    }
    console.log(error)
    return res.status(500).json(response)
  }
});

// registers new users
router.post('/register',async(req,res)=>{
    const _newUser=req.body
    
    try {
        // if email exists before creating account
        const user= await developer.findOne({email:_newUser.email}).exec()
        
        
        if(user){
          //if user exists  warn the user that email is already taken
          const {email}=user
          const response={
              status:true,
              message:`${email} has already be taken by another user.`
          }
         return res.status(401).json(response)

        }else{
          //create token and send to the user to store in their state 
          
          //use the token to authenticate further requests.

          // hash the password provided and then store it with the rest of the user's information
          // once stored return the token and the user details except the password details
          
          const {password,email,name}= _newUser 
          const _hash_password= await hash(password,config.salt);
          const _userWithPasswordEncrypted={
                email:email,
                password:_hash_password,
                name:name
            }

            const createdUser= await  developer.create(_userWithPasswordEncrypted) 
            if(createdUser){
                const token=jwt.sign({
                    email:createdUser.email,
                    _id:createdUser._id
                },config.secret,{
                    expiresIn:'1h'
                })
                const response={
                    status:true,
                    user:user,
                    token:token
                   
                }
                
             return res.status(200).json(response)
            }
            
     
        }
        
    }catch (error) {
         const response={
             status:true,
             error:`Something went wrong. ${error.message}`
         }
         console.log(error)
       return  res.status(500).json(response)
        
    }
})


// router handles all the login of users into the application

router.post('/login',async(req,res)=>{
    const _returningUser=req.body

    try {
        /*
         Get the user with the credentials, 
        */
        const user= await developer.findOne({email:_returningUser.email}).exec()
      if(user){
          /*
         if account found compare the password 
         with hashed password in the db using jwt's compare function. 
          */
          const result= await compare(_returningUser.password,user.password)
          if(result){
            //  If user is found and hashed password match, create token using the email and user id
            // using the jwt.sign function.
            const token=jwt.sign({
                email:user.email,
                _id:user._id
            },config.secret,{
                expiresIn:'1h'
            })


            return res.status(200).json({
                status: true,
                message:"Login Sucessful",
                token:token
             });
          } else{
            return res.status(401).json({
                status: false,
                message:"Not Authorized"
             });
          }
          //create token and send to the user to store in their state 
          //use the token to authenticate further requests.

      }else{
    //responsd to user when wrong details are provided.
        const response={
            status:false,
            message:'Account with details provided doesnt exist. Try Again.'
        }

        return res.status(401).json(response)
      }


    } catch (error) {
          const response={
             status:false,
             error:'Something went wrong'
         }
         console.log(error)
        return res.status(500).json(response)
    }
})




module.exports=router