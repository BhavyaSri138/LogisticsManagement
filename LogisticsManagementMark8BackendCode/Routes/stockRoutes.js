const express=require('express')
const stockRouter=express.Router();
const { postStock, getAllStock, getStockById,updateStock,deleteStock }=require('../Controllers/stockController')

//stock/
stockRouter.post('/item',postStock())
stockRouter.get('/items',getAllStock())
stockRouter.get('/item/:id',getStockById())
stockRouter.put("/stock/:id", updateStock());
stockRouter.delete("/stock/:id", deleteStock());

module.exports=stockRouter