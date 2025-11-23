 const joi = require('joi')

 //ye validation likhne ke lie use hota h like isme 3 params jate ha req,res and next

 const signupvalidation = (req,res,next)=>{
    const schema = joi.object({
        name : joi.string().min(4).max(50).required(),
        email : joi.string().email().required(),
        password : joi.string().min(6).max(50).required()
    });
    //ye curly braacket agge lgane se hm isko destructure kr pate ha jisse bad me pta chlta h ki isske andar koi erro toh nhi thi!
    const {error} = schema.validate(req.body)
    if(error) {
        return res.status(400).json({message : "Bad Request",error})
    }
    next()
 }
//LOGIN VALIDATION CHECK!
  const loginvalidation = (req,res,next)=>{
    const schema = joi.object({
        //hame sirf login check krna h toh name ki jrurt ni h isme 
        // name : joi.string().min(4).max(50).required(),
        email : joi.string().email().required(),
        password : joi.string().min(6).max(50).required()
    });
    //ye curly braacket agge lgane se hm isko destructure kr pate ha jisse bad me pta chlta h ki isske andar koi erro toh nhi thi!
    const {error} = schema.validate(req.body)
    if(error) {
        return res.status(400).json({message : "Bad Request",error})
    }
    next()
 }

 module.exports = {
    signupvalidation,
    loginvalidation
 }