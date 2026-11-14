
const express = require("express");
const apiRoutes = require("../routes");

const app = express();

// Middleware to read JSON request data
app.use(express.json());

// Main API routes
app.use("/api", apiRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to BeatBox Music Room API"
    });
});

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Server port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
    console.log(`BeatBox Music Room running at http://localhost:${PORT}`);
});
