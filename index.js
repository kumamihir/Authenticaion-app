const express = require("express")
const cors = require('cors')
const bodyparser = require('body-parser') 
const Authrouter = require('./Routes/AuthRouter.js')
const productrouter = require('./Routes/prodrouter.js')
const app = express();
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8090;

app.get('/ping',(req,res)=>{
    res.send('Pong')
})
app.use(bodyparser.json());
app.use(cors())

app.use('/auth',Authrouter)
app.use('/prod',productrouter)

app.listen(PORT,()=>{
    console.log("App sun rha h ladder ")
})

