import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant", required: true }, 
  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
      quantity: { type: Number, required: true, min: 1 , default: 1  },
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["confirmed", "cooking", "on the way", "delivered", "cancelled"],
    default: "confirmed",
  },
  deliveryAddress: { type: String, required: true },
}, { timestamps: true });

export default orderSchema;
