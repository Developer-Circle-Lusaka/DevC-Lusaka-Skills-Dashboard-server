import express from 'express'
import {hash,compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
const router= express.Router();
import developer from '../models/developer'
import config from '../config'

// route gets a list of the developers from the database 
router.get('/developers',async(req,res)=>{
  try {
      const developers= await developer.find({}).exec()
      const response={
          status:200,
          data:developers
      }
     return res.send(response)
  } catch (error) {
    const response={
        status:500,
        error:"Something went wrong"
    }
    console.log(error)
    return res.json(response)
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
              status:200,
              message:`${email} has already be taken by another user.`
          }
         return res.json(response)

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

            const result= await  developer.create(_userWithPasswordEncrypted) 
            const response={
                status:200,
                data:result,
                token:null
               
            }
            
         return   res.json(response)
        }
        
    } catch (error) {
         const response={
             status:500,
             error:'Something went wrong'
         }
         console.log(error)
       return  res.json(response)
        
    }
})


// router handles all the login of users into the application

router.post('/login',async(req,res)=>{
    const _returningUser=req.body

    try {

        const user= await developer.findOne({email:_returningUser.email}).exec()
      if(user){
          /*
           compares the user password against those in the database 
          */
          const result= await compare(_returningUser.password,user.password)
          if(result){

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
                message:"Not Authorization"
             });
          }
          //create token and send to the user to store in their state 
          //use the token to authenticate further requests.

      }else{
    //responsd to user when wrong details are provided.
        const response={
            status:404,
            message:'Account with details provided doesnt exist. Try Again.'
        }

        return res.json(response)
      }


    } catch (error) {
          const response={
             status:500,
             error:'Something went wrong'
         }
         console.log(error)
        return res.json(response)
    }
})

module.exports=router