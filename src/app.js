const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const morgan = require("morgan");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const offerFoodRouter = require("./routers/offerFood");

const app = express();
app.use(
  cors({
    credentials: true,
    "Access-Control-Allow-Origin": true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(userRouter);
app.use(taskRouter);
app.use(offerFoodRouter);

module.exports = app;
