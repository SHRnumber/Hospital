import app from "./app.js"; // Import the app instance
import cloudinary from "cloudinary";
import { config } from "dotenv";

// Load environment variables
config({ path: "./config/config.env" });

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log Cloudinary configuration for debugging
console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});


