const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {UserModel} =require('../model/user.model');
const {emailChecker} =require('../middleware/emailCheck.middleware');
const { authentication}=require('../middleware/authentication.middleware');
const { logger } =require('../middleware/logger.middleware')
const fs = require('fs');
const userRoute = express.Router();




userRoute.get('/', authentication, async (req, res) => {
    res.send('Welcome to the User Portal!')
    logger.info('Welcome to the User Portal!')
})



//  registration
userRoute.post('/register', emailChecker, async (req, res) => {
    try {
        const{ name, email, password, registered_on} = req.body;
        bcrypt.hash(password, 5,async (err, hash)=>{
            if(err){
                res.send('Error in hashing the password!')
            }else{
                let newUser=new UserModel({ name, email, password: hash, registered_on });
                let data=await newUser.save();
                res.send(data)
            }
        })
    } catch (err) {
        res.send({ 'msg': 'Error while registering the New User', 'err': err })
        logger.error({ 'msg': 'Error while registering the New User', 'err': err })
    }
})

// user-login

userRoute.post('/login', async (req, res) => {
    try{
        const {email, password}=req.body;
        let userData = await UserModel.find({email});
        if(userData.length >=1){
            bcrypt.compare(password, userData[0].password, async (err, result)=>{
                if (result){
                    let token = jwt.sign({ userEmail: userData[0].email },process.env.secret_key, {expiresIn:'7d' });

                    res.send({ 'msg': 'Logged In Successfully', 'token': token});
                }else{
                    res.send('Wrong Credentials')
                    logger.error('Wrong Credentials')
                }
            })
        }else{
            res.send('User Not Available')
            logger.error('User Not Available')
        }
    }catch(err){
        res.send(err);
    }
});




// when user logged out
userRoute.post('/logout', async (req, res)=>{
    try {
        const { token } = req.headers.authorization;
        let logOut = JSON.parse(fs.readFileSync('logOut.json', 'utf-8'))
        logOut.push(token);
        fs.writeFileSync('logOut.json', JSON.stringify(logOut));
        res.send('You have been logged Out!')
    }catch(err){
        res.send(err);
    }
})
module.exports={userRoute};

