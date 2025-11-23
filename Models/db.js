const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_DB;

mongoose.connect(mongo_url).then(()=>{
    console.log("Connect ho gya database ladle")
}).catch((err)=>{
    console.log("Nahi hua connect",err)
})