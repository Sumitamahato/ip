const mongoose=require("mongoose");


// Define the search schema
const searchSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ip: { type: String, required: true },
    city: { type: String },
  }, { timestamps: true });
  
  //  search model

  const searchModel =mongoose.model("search", searchSchema);

  module.exports={searchModel};
