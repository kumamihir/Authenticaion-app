const jwt = require('jsonwebtoken')
const ensureauth = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message:"Unauthorize, jwt Token is required"})
    }
    try{
        const decode = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decode;
        next()

    }catch(error){
        return res.status(401).json({message:"Unauthorize,jwt token is wrong or Expired "})
    }
}
module.exports = ensureauth