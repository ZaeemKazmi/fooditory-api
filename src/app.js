const express = require('express')
const cors = require('cors');
require('./db/mongoose')
const morgan = require('morgan');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(cors())

app.use(morgan("dev"));
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app