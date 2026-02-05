const express=require('express')
const userRouter=express.Router();
const {
  getAllUsers,
  createUser,
}=require('../Controllers/userController')

//users/user

userRouter.get('/users',getAllUsers)
userRouter.post('/user',createUser)



module.exports=userRouter;
