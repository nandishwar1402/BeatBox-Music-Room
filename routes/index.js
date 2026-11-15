const express = require("express");

const router = express.Router();

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

module.exports = router;