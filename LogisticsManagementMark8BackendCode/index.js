const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const dbCon=require('./dbCon/dbCon')
const stockRouter=require('./Routes/stockRoutes')
const orderRouter=require('./Routes/orderRoutes')
const driverRouter=require('./Routes/driverRoutes')
const authRouter=require('./Routes/authRoutes')
const userRouter=require('./Routes/userRoutes')

app.use(express.json())
app.use(cors())



dbCon( "mongodb+srv://manikanta:manikanta@cluster0.5uoum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")



app.use('/stock',stockRouter)
app.use('/orders',orderRouter)
app.use('/driver',driverRouter)
app.use('/authentication',authRouter)
app.use('/user',userRouter)





app.listen(3000,()=>{
    console.log('server started')
})