import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    // to restrict roles to either customer or owner if null then guest or err
    enum: ["customer", "owner"], 
    required: true 
  }, // restaurant schema
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" ,default: null }, // only for owners
  address: { type: String , required: true }, // optional for non-owners req for owners
  phone : {type:String}
}, { timestamps: true });

export default userSchema; // "User" is the model name
