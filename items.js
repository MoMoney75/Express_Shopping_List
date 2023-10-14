const express = require("express")

global.items = [
{"name" : "cheerios", "price" : "3.45"} ,
{"name": "peanut butter", "price" :"6.99"},
{"name" : "chicken","price" : "11.59"},
{"name" : "donuts", "price" : "3.25" }
]

// export items for use in app.js and routers.js
module.exports = items