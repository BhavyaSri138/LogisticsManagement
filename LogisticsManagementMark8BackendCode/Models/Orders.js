const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication", 
      required: true,
    },

 
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    deliveryAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      contact: { type: String, required: true },
    },

    
    orderType: {
      type: String,
      enum: ["Inbound", "Outbound"],
      required: true,
    },

    
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    
    assignDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    expectedDeliveryDate: {
      type: Date,
      required: true,
    },

    orderPlacedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
