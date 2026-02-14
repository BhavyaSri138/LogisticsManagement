require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const dbCon = require("./dbCon/dbCon");
const stockRouter = require("./Routes/stockRoutes");
const orderRouter = require("./Routes/orderRoutes");
const driverRouter = require("./Routes/driverRoutes");
const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");

app.use(express.json());
app.use(cors());

// Connect database
dbCon(process.env.MONGO_URI);

// Routes
app.use("/stock", stockRouter);
app.use("/orders", orderRouter);
app.use("/driver", driverRouter);
app.use("/authentication", authRouter);
app.use("/user", userRouter);

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});
