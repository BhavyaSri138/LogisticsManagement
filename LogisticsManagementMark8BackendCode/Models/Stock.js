const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      unique:true,
      lowercase: true
    },
    subCategory: {
      type: String,
      trim: true,
    },
    productDetails: {
      description: { type: String, trim: true },
      price: { type: Number },
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, 
    },
    origin: {
      type: String,
      required: true, 
      trim: true,
    },
    location: {
      type: String,
      required: true, 
      trim: true,
    },
    rack: {
      type: String,
      required: true, 
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
