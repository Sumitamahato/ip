
const validateIpAdress =(req,res,next)=>{
    const ipAddress=req.params.ipAddress;
    if(!ipAddress.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}.d{1,3}$/)){
        return res.status(400).json({message:"invalid Ip address"})
    }
    next();
};

application.post ("/login",(req,res))