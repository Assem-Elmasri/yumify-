import e from "express";
import mongoose from "mongoose";
import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGen.util.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = e.Router();

// Create User Model
const User = mongoose.model("User", userSchema);


// Route to register a new user
router.post("/register", async (req, res) => {
    const { name, email, password , address,role } = req.body;
    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword , address, role });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in POST /register (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); // Find user by email
        if (!user) { // User not found
            return res.status(400).json({ message: "Invalid email or password" }); //invalid credentials
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords provided and stored
        if (!isPasswordValid) { // Passwords do not match
            return res.status(400).json({ message: "Invalid email or password" });
        }
        let tokenGenerated = generateToken(res,user);
        res.status(200).json({ message: "Login successful", tokenGenerated });
    } catch (error) { // Handle server errors
        console.error("Error in POST /login (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in GET /profile (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// user logout route
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful" });
});

export default router;