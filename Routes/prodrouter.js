const ensureauth = require('../Middleware/auth')

const route = require('express').Router()
route.get('/',ensureauth,(req,res)=>{
    res.status(200).json([
        {
            name : "Mobile",
            Price : 9999
        },
        {
            name : "Laptop",
            Price : 49999
        }
    ])
})
module.exports = route