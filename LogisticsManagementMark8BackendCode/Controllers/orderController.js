const Order = require("../Models/Orders");
const Stock = require("../Models/Stock"); 
const Driver=require('../Models/Driver');
const Auth = require('../Models/Auth'); 

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await Auth.countDocuments();
    const totalShipments = await Order.countDocuments();
    const totalDrivers = await Driver.countDocuments();

    // Distinct warehouse locations from stock
    const totalWarehouses = (await Stock.distinct("location")).length;

    // Recent activities
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("assignDriver", "name");

    const recentUsers = await Auth.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const recentStocks = await Stock.find()
      .sort({ updatedAt: -1 })
      .limit(3);

    const recentActivity = [];

    recentOrders.forEach((order) => {
      if (order.assignDriver) {
        recentActivity.push(
          `Shipment ${order.orderId} assigned to Driver ${order.assignDriver.name}`
        );
      } else {
        recentActivity.push(`Shipment ${order.orderId} created`);
      }
    });

    recentUsers.forEach((user) => {
      recentActivity.push(`User ${user.name} registered`);
    });

    recentStocks.forEach((stock) => {
      recentActivity.push(`Warehouse stock updated: ${stock.productName}`);
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalShipments,
        totalDrivers,
        totalWarehouses,
      },
      recentActivity,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: err.message,
    });
  }
};

const getLogisticsAnalytics = async (req, res) => {
  try {
    // Orders summary
    const totalOrders = await Order.countDocuments();
    const delivered = await Order.countDocuments({ status: "Delivered" });
    const pending = await Order.countDocuments({ status: "Pending" });
    const delayed = await Order.countDocuments({
      status: { $in: ["In Transit", "Out for Delivery"] },
      expectedDeliveryDate: { $lt: new Date() },
    });

    // Top performing drivers
    const driverPerformance = await Order.aggregate([
      { $match: { status: "Delivered", assignDriver: { $ne: null } } },
      {
        $group: {
          _id: "$assignDriver",
          deliveries: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "drivers",
          localField: "_id",
          foreignField: "_id",
          as: "driverDetails",
        },
      },
      { $unwind: "$driverDetails" },
      {
        $project: {
          _id: 0,
          driverName: "$driverDetails.driverName",
          deliveries: 1,
        },
      },
      { $sort: { deliveries: -1 } },
      { $limit: 3 },
    ]);

    // Pending Goods
    const pendingGoods = await Order.aggregate([
      { $match: { status: "Pending" } },
      {
        $lookup: {
          from: "stocks",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          orderId: "$orderId",
          itemName: "$productDetails.productName",
          subCategory: "$productDetails.subCategory",
          quantity: "$quantity",
        },
      },
    ]);

    return res.json({
      success: true,
      report: {
        logistics: {
          total: totalOrders,
          delivered,
          pending,
          delayed,
        },
        topDrivers: driverPerformance,
        pendingGoods: pendingGoods.length > 0 ? pendingGoods : "N/A",
      },
    });
  } catch (err) {
    console.error("Error in analytics function:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};





const postOrder = () => {
  return async function (req, res) {
    try {
      const {
        orderId,
        user,
        product,
        quantity,
        deliveryAddress,
        orderType,
        expectedDeliveryDate,
        assignDriver, // optional
        status        // optional
      } = req.body;

      // Check stock availability
      const stockItem = await Stock.findById(product);
      if (!stockItem) {
        return res.status(404).json({ message: "Product not found in stock" });
      }

      if (stockItem.quantity < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      // Create new order
      const newOrder = new Order({
        orderId,
        user,
        product,
        quantity,
        deliveryAddress,
        orderType,
        expectedDeliveryDate,
        assignDriver: assignDriver || null,
        status: status || "Pending"
      });

      await newOrder.save();

      // Deduct stock
      stockItem.quantity -= quantity;
      await stockItem.save();

      res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error placing order",
        error: err.message,
      });
    }
  };
};

const getAllOrders = () => {
  return async function (req, res) {
    try {
      const orders = await Order.find().populate("product"); 
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
  };
};


const getOrderById = () => {
  return async function (req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({ orderId: id }).populate("product");

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order", error: err.message });
    }
  };
};




const putDriverOrder = () => {
  return async function (req, res) {
    try {
      const { driverId, orderId } = req.body;
      console.log("Request body:", req.body);

      // Query using {_id: orderId}
      const order = await Order.findOne({ _id: orderId });
      console.log("Found order:", order);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Query driver using {_id: driverId}
      const driver = await Driver.findOne({ _id: driverId });
      console.log("Found driver:", driver);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      // Assign driver
      order.assignDriver = driverId;
      await order.save();

      // Mark driver as busy
      driver.isTaskAssigned = true;
      await driver.save();
      console.log(driver);
      res.status(200).json({
        success: true,
        message: "Driver assigned successfully",
        order,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error assigning driver",
        error: err.message,
      });
    }
  };
};






// Get total orders + count by status
const getOrderStats = () => {
  return async function (req, res) {
    try {
      // Total orders

      const totalOrders = await Order.countDocuments();
      console.log(totalOrders)
      // Count orders grouped by status
      const ordersByStatus = await Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]);

      // Transform result into key-value format
      const statusCounts = {};
      ordersByStatus.forEach(item => {
        statusCounts[item._id] = item.count;
      });

      res.status(200).json({
        totalOrders,
        statusCounts
      });
    } catch (err) {
      res.status(500).json({
        message: "Error calculating order stats",
        error: err.message,
      });
    }
  };
};



const getTopDriversOrders = () => {
  return async function (req, res) {
    try {
      const topDrivers = await Order.aggregate([
        {
          $match: {
            assignDriver: { $ne: null } 
          }
        },
        {
          $group: {
            _id: "$assignDriver",   // group by driverId
            totalOrders: { $sum: 1 }
          }
        },
        {
          $sort: { totalOrders: -1 } // sort descending by number of orders
        },
        {
          $limit: 5 // get only top 5 drivers
        },
        {
          $lookup: {
            from: "drivers",        // Driver collection name
            localField: "_id",
            foreignField: "_id",
            as: "driverDetails"
          }
        },
        {
          $unwind: "$driverDetails"
        },
        {
          $project: {
            _id: 0,
            driverId: "$driverDetails._id",
            driverName: "$driverDetails.driverName",
            vehicleName: "$driverDetails.vehicleName",
            vehiclePlateNo: "$driverDetails.vehiclePlateNo",
            licenseNo: "$driverDetails.licenseNo",
            totalOrders: 1
          }
        }
      ]);

      res.status(200).json(topDrivers);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching top drivers",
        error: err.message
      });
    }
  };
};


// Get shipment analytics (this month vs last month)
const getShipmentStats = () => {
  return async function (req, res) {
    try {
      const now = new Date();
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      // Count this month
      const thisMonthOrders = await Order.find({
        orderPlacedDate: { $gte: startOfThisMonth, $lte: now }
      }).populate("product");

      // Count last month
      const lastMonthOrders = await Order.find({
        orderPlacedDate: { $gte: startOfLastMonth, $lte: endOfLastMonth }
      }).populate("product");

      // Calculate metrics
      const stats = {
        totalShipments: {
          current: thisMonthOrders.length,
          previous: lastMonthOrders.length,
          change: `${(((thisMonthOrders.length - lastMonthOrders.length) / (lastMonthOrders.length || 1)) * 100).toFixed(1)}%`
        },
        activeShipments: {
          current: thisMonthOrders.filter(o => ["In Transit", "Out for Delivery"].includes(o.status)).length,
          previous: lastMonthOrders.filter(o => ["In Transit", "Out for Delivery"].includes(o.status)).length,
          change: `${thisMonthOrders.filter(o => ["In Transit", "Out for Delivery"].includes(o.status)).length - lastMonthOrders.filter(o => ["In Transit", "Out for Delivery"].includes(o.status)).length}`
        },
        delivered: {
          current: thisMonthOrders.filter(o => o.status === "Delivered").length,
          previous: lastMonthOrders.filter(o => o.status === "Delivered").length,
          change: `${(((thisMonthOrders.filter(o => o.status === "Delivered").length - lastMonthOrders.filter(o => o.status === "Delivered").length) / (lastMonthOrders.filter(o => o.status === "Delivered").length || 1)) * 100).toFixed(1)}%`
        },
        totalValue: {
          current: thisMonthOrders.reduce((sum, o) => sum + (o.quantity * (o.product?.productDetails?.price || 0)), 0),
          previous: lastMonthOrders.reduce((sum, o) => sum + (o.quantity * (o.product?.productDetails?.price || 0)), 0),
          change: `${(((thisMonthOrders.reduce((sum, o) => sum + (o.quantity * (o.product?.productDetails?.price || 0)), 0) - lastMonthOrders.reduce((sum, o) => sum + (o.quantity * (o.product?.productDetails?.price || 0)), 0)) / (lastMonthOrders.reduce((sum, o) => sum + (o.quantity * (o.product?.productDetails?.price || 0)), 0) || 1)) * 100).toFixed(1)}%`
        }
      };

      res.status(200).json(stats);

    } catch (err) {
      res.status(500).json({
        message: "Error calculating shipment stats",
        error: err.message
      });
    }
  };
};

const calculateChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0; 
  }
  return Number((((current - previous) / previous) * 100).toFixed(2));
};

const getUserOrderStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Date ranges
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // 📦 All-time totals
    const totalShipmentsOverall = await Order.countDocuments({ user: userId });
    const activeStatuses = ["Pending", "Confirmed", "In Transit", "Out for Delivery"];
    const activeShipmentsOverall = await Order.countDocuments({
      user: userId,
      status: { $in: activeStatuses },
    });
    const deliveredShipmentsOverall = await Order.countDocuments({
      user: userId,
      status: "Delivered",
    });

    let totalValueOverall = 0;
    const allOrders = await Order.find({ user: userId }).populate("product");
    allOrders.forEach((order) => {
      if (order.product && order.product.productDetails?.price) {
        totalValueOverall += order.quantity * order.product.productDetails.price;
      }
    });

    // 📦 Monthly totals
    const totalThisMonth = await Order.countDocuments({
      user: userId,
      orderPlacedDate: { $gte: startOfThisMonth, $lte: now },
    });
    const totalLastMonth = await Order.countDocuments({
      user: userId,
      orderPlacedDate: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const activeThisMonth = await Order.countDocuments({
      user: userId,
      status: { $in: activeStatuses },
      orderPlacedDate: { $gte: startOfThisMonth, $lte: now },
    });
    const activeLastMonth = await Order.countDocuments({
      user: userId,
      status: { $in: activeStatuses },
      orderPlacedDate: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const deliveredThisMonth = await Order.countDocuments({
      user: userId,
      status: "Delivered",
      orderPlacedDate: { $gte: startOfThisMonth, $lte: now },
    });
    const deliveredLastMonth = await Order.countDocuments({
      user: userId,
      status: "Delivered",
      orderPlacedDate: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const ordersThisMonth = await Order.find({
      user: userId,
      orderPlacedDate: { $gte: startOfThisMonth, $lte: now },
    }).populate("product");

    const ordersLastMonth = await Order.find({
      user: userId,
      orderPlacedDate: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    }).populate("product");

    let valueThisMonth = 0;
    let valueLastMonth = 0;

    ordersThisMonth.forEach((order) => {
      if (order.product && order.product.productDetails?.price) {
        valueThisMonth += order.quantity * order.product.productDetails.price;
      }
    });

    ordersLastMonth.forEach((order) => {
      if (order.product && order.product.productDetails?.price) {
        valueLastMonth += order.quantity * order.product.productDetails.price;
      }
    });

    // 📊 Response
    res.json({
      userId,
      totals: {
        totalShipments: totalShipmentsOverall,
        activeShipments: activeShipmentsOverall,
        deliveredShipments: deliveredShipmentsOverall,
        totalValue: totalValueOverall,
      },
      thisMonth: {
        totalShipments: {
          count: totalThisMonth,
          change: `${calculateChange(totalThisMonth, totalLastMonth)}%`,
        },
        activeShipments: {
          count: activeThisMonth,
          change: `${calculateChange(activeThisMonth, activeLastMonth)}%`,
        },
        deliveredShipments: {
          count: deliveredThisMonth,
          change: `${calculateChange(deliveredThisMonth, deliveredLastMonth)}%`,
        },
        totalValue: {
          amount: valueThisMonth,
          change: `${calculateChange(valueThisMonth, valueLastMonth)}%`,
        },
      },
      orders: allOrders, // 👈 returning all orders in an array
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



const getUnassignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ assignDriver: null })
      .populate("user", "name email")   // optional: show user details
      .populate("product", "productName subCategory") // optional: show product details
      .exec();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching unassigned orders",
      error: error.message
    });
  }
};




const getCompleteStats = async (req, res) => {
  try {
    // Fetch all orders and populate product info
    const orders = await Order.find()
      .populate("product", "productName subCategory quantity")
      .sort({ orderPlacedDate: -1 });

    // --- Monthly Inventory Flow (Jan-Dec) ---
    const monthlyInventory = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      incoming: 0,
      outgoing: 0,
    }));

    orders.forEach(order => {
      const monthIndex = new Date(order.orderPlacedDate).getMonth();
      if (order.orderType === "Inbound") {
        monthlyInventory[monthIndex].incoming += order.quantity;
      } else {
        monthlyInventory[monthIndex].outgoing += order.quantity;
      }
    });

    // --- Inventory by Category (using Stock subCategory) ---
    const categoryMap = {};
    orders.forEach(order => {
      const category = order.product?.subCategory || "Other";
      categoryMap[category] = (categoryMap[category] || 0) + order.quantity;
    });
    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    // --- Recent Activity (last 5 orders) ---
    const recentActivity = orders.slice(0, 5).map(order => ({
      orderId: order.orderId,
      status: order.status,
      timestamp: order.orderPlacedDate,
    }));

    // --- Top Stats ---
    // Total Items = total number of Stock documents
    const totalItems = await Stock.countDocuments();

    // Low Stock Items (quantity < threshold)
    const lowStockThreshold = 50;
    const lowStockItems = await Stock.countDocuments({ quantity: { $lt: lowStockThreshold } });

    // Active Orders (orders not Delivered or Cancelled)
    const activeOrders = orders.filter(
      order => order.status !== "Delivered" && order.status !== "Cancelled"
    ).length;

    res.json({
      monthlyInventory,
      categoryData,
      recentActivity,
      stats: {
        totalItems,
        lowStockItems,
        activeOrders,
      }
    });

  } catch (error) {
    console.error("Error fetching shipment data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteOrder = () => {
  return async function (req, res) {
    try {
      const { id } = req.params;
     
      const deletedStock = await order.findByIdAndDelete({ _id: id });

      if (!deletedStock) {
        return res.status(404).json({ message: "order item not found" });
      }

      res.status(200).json({
        success: true,
        message: "order deleted successfully",
        stock: deletedStock
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error deleting order",
        error: err.message,
      });
    }
  };
};



const updateOrder = () => {
  return async function (req, res) {
    try {
      const { orderId, driverId, status } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: "Order ID is required" });
      }

      let driver = null;

      
      if (driverId) {
        driver = await Driver.findOne({ _id: driverId });
        if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
        }
      }

      // ✅ Update order by custom `orderId`
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId }, 
        {
          ...(driver && { assignDriver: driver._id }),
          ...(status && { status }),
        },
        { new: true } // return updated document
      )
        .populate("product", "productName subCategory")
        .populate("assignDriver", "driverId name"); // ✅ show driver details

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
};









module.exports = { updateOrder,postOrder, getAllOrders, getOrderById ,putDriverOrder,getOrderStats,getTopDriversOrders,getShipmentStats,getUserOrderStats,getUnassignedOrders,getDashboardStats,getLogisticsAnalytics,getCompleteStats,deleteOrder};
