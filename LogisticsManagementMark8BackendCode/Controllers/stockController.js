const Stock = require("../Models/Stock");


const postStock = () => {
  return async function (req, res) {
    try {
      const { productName, subCategory, productDetails, quantity, origin, location, rack } = req.body;

      const newStock = new Stock({
        productName,
        subCategory,
        productDetails,
        quantity,
        origin,
        location,
        rack,
      });

      await newStock.save();

      res.status(201).json({
        message: "Stock item added successfully",
        stock: newStock,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error adding stock",
        error: err.message,
      });
    }
  };
};


const getAllStock = () => {
  return async function (req, res) {
    try {
      const stocks = await Stock.find();
      res.status(200).json(stocks);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching stock items",
        error: err.message,
      });
    }
  };
};


const getStockById = () => {
  return async function (req, res) {
    try {
      const { id } = req.params;
      const stock = await Stock.findById(id);

      if (!stock) {
        return res.status(404).json({ message: "Stock item not found" });
      }

      res.status(200).json(stock);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching stock item",
        error: err.message,
      });
    }
  };
};


const updateStock = () => {
  return async function (req, res) {
    try {
      const { id } = req.params;
      console.log("Updating stock with _id:", id);

      const updates = req.body; 
      
      const updatedStock = await Stock.findOneAndUpdate(
        { _id: id },
        updates,
        {
          new: true,        
          runValidators: true 
        }
      );

      if (!updatedStock) {
        return res.status(404).json({ message: "Stock item not found" });
      }

      res.status(200).json({
        success: true,
        message: "Stock updated successfully",
        stock: updatedStock
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error updating stock",
        error: err.message,
      });
    }
  };
};


const deleteStock = () => {
  return async function (req, res) {
    try {
      const { id } = req.params;
     console.log("Updating stock with _id:", id);
      const deletedStock = await Stock.findByIdAndDelete({ _id: id });

      if (!deletedStock) {
        return res.status(404).json({ message: "Stock item not found" });
      }

      res.status(200).json({
        success: true,
        message: "Stock deleted successfully",
        stock: deletedStock
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error deleting stock",
        error: err.message,
      });
    }
  };
};

module.exports = { postStock, getAllStock, getStockById ,updateStock,deleteStock};
