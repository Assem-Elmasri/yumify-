
import e from "express"; // Import Express framework
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import cors from "cors";// Import CORS middleware
import foodRoutes from "./routes/food.route.js";
import cartRoutes from "./routes/cart.rotes.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./config/db.js";

dotenv.config(); // Load environment variables (.env file mongoDB connection, PORT, etc.)

const app = e();// Initialize Express app
app.use(e.json());  // Middleware to parse JSON request bodies
app.use(cors());    // Enable CORS for cross-origin requests

// Mount API routers under /api prefix so client can use /api/foods 
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server due to DB error:", err);
});