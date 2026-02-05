const express=require('express')
const driverRouter=express.Router()
const { postDriver, getAvailableDrivers, getDriverById, getAssignedDrivers, getDriverOrderById}=require('../Controllers/driverController')


//driver
driverRouter.post('/driver',postDriver())
driverRouter.get('/driver',getAvailableDrivers())
driverRouter.get('/driver/:id',getDriverById())
driverRouter.get('/assignedDrivers',getAssignedDrivers())
driverRouter.get("/driver/orders/:driverId",getDriverOrderById)




module.exports=driverRouter