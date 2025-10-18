import e from "express";
import mongoose from "mongoose";
import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";


const router = e.Router();

// Create User Model
const User = mongoose.model("User", userSchema);


// Route to register a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in POST /register (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

export default router;