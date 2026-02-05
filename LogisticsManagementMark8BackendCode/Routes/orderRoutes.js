const express=require('express')
const orderRouter=express.Router();
const { postOrder, getAllOrders, getOrderById,putDriverOrder,getOrderStats,getTopDriversOrders,getShipmentStats,getUserOrderStats,
    getUnassignedOrders,getDashboardStats,getLogisticsAnalytics,getCompleteStats,deleteOrder,
    updateOrder
}=require('../Controllers/orderController')

//orders
orderRouter.post('/order',postOrder())
orderRouter.get('/order',getAllOrders())
orderRouter.get('/order/:id',getOrderById())
orderRouter.put("/assignShipment", putDriverOrder());
orderRouter.get('/orderStats',getOrderStats())
orderRouter.get('/stopOrderDriver',getTopDriversOrders())
orderRouter.get('/shipmentStats',getShipmentStats())
orderRouter.get('/stats/:userId',getUserOrderStats)
orderRouter.get('/assignShipment',getUnassignedOrders)
orderRouter.get("/admin/dashboard", getDashboardStats);
orderRouter.get("/analytics", getLogisticsAnalytics);
orderRouter.get("/getshipment",getCompleteStats)
orderRouter.delete('/order/:id', deleteOrder) 
orderRouter.put("/order", updateOrder());


module.exports=orderRouter 