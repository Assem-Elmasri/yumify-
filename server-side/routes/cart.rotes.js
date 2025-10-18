import e from "express";
import mongoose from "mongoose";
import cartSchema from "../models/cart.model.js";

const router = e.Router();

// Create Cart Model
const Cart = mongoose.model("Cart", cartSchema);

// Route to get cart by customer ID
router.get("/:customerId", async (req, res) => {
    try {
        // gets food details => gets the customer's cart => populates food details
        const cart = await Cart.findOne({ customer: req.params.customerId }).populate("items.food"); 
        if (!cart) {
            // If no cart found return empty cart message
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart); // Return the cart details
    } catch (error) {
        res.status(500).json({ message: "Server error", error }); //handle server errors
    }
});

// Route to add item to cart
router.post("/:customerId/add", async (req, res) => {
    const { foodId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ customer: req.params.customerId }); // Find cart by customer ID
        if (!cart) { // If no cart exists, create a new one
            cart = new Cart({ customer: req.params.customerId, items: [] });
        }
        // Check if item already exists in cart and update quantity if it does and add new item if it doesn't
        const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ food: foodId, quantity });
        }
        // Save the updated cart
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Route to remove item from cart
router.post("/:customerId/remove", async (req, res) => {
    const { foodId } = req.body;
    try { //same as above but removes item from cart
        const cart = await Cart.findOne({ customer: req.params.customerId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter(item => item.food.toString() !== foodId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



export default router;
