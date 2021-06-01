const express=require("express")
const path=require("path")
require("./db/mongoose")

const userRouter=require("./routers/user_router")
const taskRouter=require("./routers/task_router")
const cors = require('cors')
const app=express()



app.use(cors())
  app.use(express.json()) //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(userRouter)
app.use(taskRouter)

//image upload
app.use("/Img",express.static(path.join("backend/Img")))

module.exports=app

