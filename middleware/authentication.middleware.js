
const jwt = require("jsonwebtoken");



const authentication =async(req,res,next)=>{

    const token = req.headers.authorization;
    if(token){
        jwt.verify(token.process.env.secret_key),(err,decode)=>{
            if(decode){
                console.log(decode);
                next();
            }else{
                res.send("Login Required");
            }
        }

        }else{
            res.send("Protected Route");
    }
}

module.exports={authentication};