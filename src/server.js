
const express = require("express");

const app = express();

// Middleware to read JSON request data
app.use(express.json());

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

// Server port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
    console.log(`BeatBox Music Room running at http://localhost:${PORT}`);
});
