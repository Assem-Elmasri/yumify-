import e from "express";
import mongoose from "mongoose";
import foodSchema from "../models/food.model.js";

const router = e.Router();

// Create Food Model
const Food = mongoose.model("Food", foodSchema);

// Route to get all food items
// Note: paths here are relative to where the router is mounted (e.g. /api/foods)
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find(); // Fetch all food items from the database
        res.json(foods); // Return the list of food items as JSON
    } catch (error) {
        console.error("Error in GET / (food.route):", error); // log for debugging
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});


// Route to add a new food by an owner
router.post("/add", async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;
    try {
        const newFood = new Food({ name, description, price, category, imageUrl });
        await newFood.save();
        res.status(201).json(newFood); // Return the newly created food item
    } catch (error) {
        console.error("Error in POST /add (food.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

//Route to modify existing food item
router.put("/:foodId", async (req, res) => {
    const { foodId } = req.params;
    const { name, description, price, category, imageUrl } = req.body;
    try {
        const updatedFood = await Food.findByIdAndUpdate(foodId, { name, description, price, category, imageUrl }, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json(updatedFood); // Return the updated food item
    } catch (error) {
        console.error("Error in PUT /:foodId (food.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

// Route to delete a food item
router.delete("/:foodId", async (req, res) => {
    const { foodId } = req.params;
    try {
        const deletedFood = await Food.findByIdAndDelete(foodId);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json({ message: "Food item deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /:foodId (food.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

export default router;