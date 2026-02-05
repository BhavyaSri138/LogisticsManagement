const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    driverName: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleName: {
      type: String,
      required: true,
      trim: true
    },
    vehiclePlateNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    licenseNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    carrierName: {   
      type: String,
      required: true,
      trim: true,
    },
    isTaskAssigned: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
