const express = require('express')
const cors = require('cors');
const http = require('http')
require('./db/mongoose')
const morgan = require('morgan');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const {setIo: setChatIo, router: chatRouter} = require('./routers/chat')

const app = express()

app.use(
    cors({
      credentials: true,
      'Access-Control-Allow-Origin': true
    })
  );

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(userRouter)
app.use(taskRouter)
app.use(chatRouter)

const server = http.createServer(app)
const io = setChatIo(server)

module.exports = server