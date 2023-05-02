
const mongoose=require("mongoose");


// user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  // user model
  const UserModel = mongoose.model('User', userSchema);

  module.exports={UserModel};
  