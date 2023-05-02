const { UserModel } = require("../model/user.model");




const emailChecker = async(req,res,next)=>{
    const {email} =req.body;
    let data =await UserModel.find({email});
    if(data.length>=1){
        res.send('Email-id already existed')
    }else{
        next();
    }
}




module.exports ={emailChecker};