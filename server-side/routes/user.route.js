import e from "express";
import mongoose, { Mongoose } from "mongoose";
import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGen.util.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import jwt from 'jsonwebtoken'
import verifyToken from "../utils/tokenVerify.util.js";
import restaurantSchema from "../models/restaurant.model.js";


const router = e.Router();

// Create User Model
const User = mongoose.model("User", userSchema);

const Restaurant = mongoose.model("Restaurant",restaurantSchema);


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
        if(role==='owner'){
            // Create a new restaurant for the owner
            const newRestaurant = new Restaurant({ name: `${name}'s Restaurant` });
            await newRestaurant.save();
            // Create the user with the restaurant reference
            const newUser = new User({ name, email, password: hashedPassword , address, role, restaurant: newRestaurant._id });
            await newUser.save();
            return res.status(201).json({ message: "Owner registered successfully with restaurant" });
        }
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
        res.status(200).json({ message: "Login successful", tokenGenerated, role: user.role });
    } catch (error) { // Handle server errors
        console.error("Error in POST /login (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message }); // Handle server errors
    }
});

router.put('/updatePassword',protect,async (req,res)=>{
    try {
        const {password,newPassword} = req.body
        const token = verifyToken(req.cookies.token)
        const user = await User.findById(token.id)
        if(!password && !newPassword){
            return res.status(400).json({message:'please send both passwords'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:'password is incorrect'})
        }
        const newPasswordHashed = await bcrypt.hash(newPassword,10)
        await user.updateOne({$set:{password:newPasswordHashed}})
        console.log("done")
        res.status(200).json('password have changed correctly')
    } catch (error) {
        console.error('Error in PUT /updtaePassword',error)
        res.status(500)
    }
})

router.get("/profile", protect, async (req, res) => {
    try {
        const token = verifyToken(req.cookies.token)
        const user = await User.findById(token.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in GET /profile (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// route to add profile pic
router.put('/addUserProfile',upload.single('profile'),async (req,res)=>{
    try {
        const imageUrl = req.file?req.file.filename:null;
        let token = verifyToken(req.cookies.token)
        console.log('sent profile:',imageUrl)
        const user = await User.findByIdAndUpdate(token.id,{$set:{imageUrl:imageUrl}},{new:true})
        res.status(200).json({message:"profile has been uploead for",user})
    } catch (error) {
        console.error("Error in POST /addUserProfile  (user.route):", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

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