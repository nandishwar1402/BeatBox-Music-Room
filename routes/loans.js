
const express = require("express");
const router = express.Router();

const connectDB = require("../database/db");

// GET loans with musician and instrument names
router.get("/", async (req, res) => {
    let db;

    try {
        db = await connectDB();

        const loans = await db.all(`
            SELECT
                loans.id,
                loans.musician_id,
                musicians.name AS musician_name,
                loans.instrument_id,
                instruments.name AS instrument_name,
                loans.loan_date,
                loans.return_date
            FROM loans
            INNER JOIN musicians
                ON loans.musician_id = musicians.id
            INNER JOIN instruments
                ON loans.instrument_id = instruments.id
        `);

        res.status(200).json({
            success: true,
            message: "Loans retrieved successfully",
            data: loans
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        if (db) await db.close();
    }
});

module.exports = router;
