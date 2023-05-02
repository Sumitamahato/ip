const express =require("express");
const {connection} =require("./configs/connection");
const {userRoutes} = require("./route/user.routes");
const{appRoutes} =require("./route/app.routes");
 require("dotenv").config();

 const app =express();
  app.use(express.json());



  app.get("/",(req,res)=>{
    res.send("This is IP Info Application")
  });





  app.listen(process.env.port, async(req,res)=>{
try {
    await connection;
    console.log("connected to DB")
} catch (err) {
    console.log(err)
    console.log("not connected to db")
}
console.log(`server is running in the port ${process.env.port}`);
  })
