 
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})


app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true 
}))



// const user = require('./routes/UserRoutes.js')
// const todo = require('./routes/TodoRoutes.js')


// app.use("/api/v1",user);
// app.use("/api/v1",todo);



app.get('/',(req,res)=>{
    res.json("I am working")
})


module.exports = app ;