
const express = require("express");
const router = express.Router();

const instrumentRoutes = require("./instruments");
const loanRoutes = require("./loans");

// API home route
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BeatBox Music Room API is running",
        endpoints: {
            musicians: "/api/musicians",
            instruments: "/api/instruments",
            loans: "/api/loans"
        }
    });
});

// Instrument APIs
router.use("/instruments", instrumentRoutes);

// Loans JOIN API
router.use("/loans", loanRoutes);

module.exports = router;
