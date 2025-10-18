import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String },
  // Accept imageUrl to match client payload. Keep backwards compatibility if needed.
  imageUrl: { type: String }, // URL or path to the image
  // can add more fields like ingredients, calories, availability
  // Make owner optional so test POSTs without authentication can create items.
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  }
}, { timestamps: true });

export default foodSchema;
