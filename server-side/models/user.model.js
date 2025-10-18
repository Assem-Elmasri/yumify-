import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    // to restrict roles to either customer or owner if null then guest or err
    enum: ["customer", "owner"], 
    required: false 
  },
  restaurantName: { type: String }, // optional for non-owners req for owners
  address: { type: String }, // optional for non-owners req for owners
  foods: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Food" } // list of food items added by the owner
  ]
}, { timestamps: true });

export default userSchema; // "User" is the model name
