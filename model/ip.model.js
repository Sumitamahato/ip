const mongoose=require("mongoose");


const ipInfoSchema = new mongoose.Schema({
  ipAddress: String,
  city: String,
  country: String,
  continent: String,
});
const IpInfoModel = mongoose.model('IpInfo', ipInfoSchema);

module.exports={IpInfoModel};


