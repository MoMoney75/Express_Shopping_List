const express = require("express")
const app = express()
const router = require("./router") 
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/",router)

   
// export app for use in server.js
module.exports = app