const Driver = require("../Models/Driver");
const Order=require('../Models/Orders')

const postDriver = () => {
  return async function (req, res) {
    try {
      const { driverName, vehicleName, vehiclePlateNo, licenseNo, address, carrierName, isTaskAssigned } = req.body;

      const newDriver = new Driver({
        driverName,
        vehicleName,
        vehiclePlateNo,
        licenseNo,
        address,
        carrierName,
        isTaskAssigned
      });
   
      await newDriver.save();

      res.status(201).json({
        message: "Driver added successfully",
        driver: newDriver,
      });

    }
     catch (err) {
      res.status(500).json({
        message: "Error adding driver",
        error: err.message,
      });
    }
  };
};


const getAvailableDrivers = () => {
  return async function (req, res) {
    try {
    const drivers = await Driver.find({ isTaskAssigned: false });
    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available drivers",
      error: error.message
    });
  }
    }
  };



const getDriverById = () => {
  return async function (req, res) {
    try {
      const { id } = req.params;
      const driver = await Driver.findById(id);

      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      res.status(200).json(driver);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching driver",
        error: err.message,
      });
    }
  };
};


const getAssignedDrivers = () => {
  return async function (req, res) {
    try {
      const drivers = await Driver.find({ isTaskAssigned: true });
      res.status(200).json({
        success: true,
        count: drivers.length,
        data: drivers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching assigned drivers",
        error: error.message
      });
    }
  };
};




const getDriverOrderById= async (req, res) => {
  try {
    const { driverId } = req.params;

    
    const driver = await Driver.findOne({ _id: driverId });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const orders = await Order.find({ assignDriver: driver._id })
      .populate("product", "productName subCategory quantity") // include product details
      .populate("assignDriver", "driverId name") // include driver details
      .populate("user", "username email"); // include customer details if needed

    res.json(orders);
  } catch (error) {
    console.error("Error fetching driver orders:", error);
    res.status(500).json({ error: "Server error" });
  }
}




module.exports = { postDriver, getAvailableDrivers, getDriverById ,getAssignedDrivers,getDriverOrderById};
