import express from 'express'
const router= express.Router();
import developer from '../models/developer'


// route gets a list of the developers from the database 
router.get('/developers',async(req,res)=>{
  try {
      const developers= await developer.find({}).exec()
      const response={
          status:200,
          data:developers
      }
      res.send(response)
  } catch (error) {
    const response={
        status:500,
        error:"Something went wrong"
    }
    console.log(error)
    res.json(response)
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
          res.json(response)

        }else{
          //create token and send to the user to store in their state 
          
          //use the token to authenticate further requests.

            const result= await  developer.create(_newUser) 
            const response={
                status:200,
                data:result,
                token:null
               
            }
            
            res.json(response)
        }
        
    } catch (error) {
         const response={
             status:500,
             error:'Something went wrong'
         }
         console.log(error)
         res.json(response)
        
    }
})


// router handles all the login of users into the application

router.post('/login',async(req,res)=>{
    const _returningUser=res.body

    try {
        const user= await findOne({email:_returningUser.email,password:_returningUser.password}).exec()
      if(user){
          //create token and send to the user to store in their state 
          //use the token to authenticate further requests.

      }else{
    //responsd to user when wrong details are provided.
        const response={
            status:404,
            message:'Account with details provided doesnt exist. Try Again.'
        }

        res.json(response)
      }


    } catch (error) {
          const response={
             status:500,
             error:'Something went wrong'
         }
         console.log(error)
         res.json(response)
    }
})

module.exports=router