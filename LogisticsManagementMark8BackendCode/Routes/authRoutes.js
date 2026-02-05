const express=require('express')
const authRouter=express.Router()
const {loginMethod,signupMethod,changePasswordMethod,googleAuthMethod}=require('../Controllers/authController')



authRouter.post('/login',loginMethod)
authRouter.post('/signup',signupMethod)
authRouter.put('/updatePassword',changePasswordMethod)
authRouter.post('/google',googleAuthMethod)



module.exports=authRouter