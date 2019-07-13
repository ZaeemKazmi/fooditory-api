const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const morgan = require("morgan");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const itemRouter = require("./routers/item");

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

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use(userRouter);
app.use(taskRouter);
app.use(itemRouter);

module.exports = app;
