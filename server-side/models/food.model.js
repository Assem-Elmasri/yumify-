import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String }, // URL or path to the image
  // can add more fields like ingredients, calories, availabity
  owner: { // reference to the User => owner
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);
