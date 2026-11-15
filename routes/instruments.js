
const express = require("express");
const router = express.Router();

const connectDB = require("../database/db");
const validateInstrument = require("../middleware/instrumentValidation");
const searchInstruments = require("../middleware/instrumentSearch");

// GET all instruments and search instruments
router.get("/", searchInstruments, async (req, res) => {
    let db;

    try {
        db = await connectDB();

        let instruments;

        if (req.searchTerm) {
            instruments = await db.all(
                `SELECT * FROM instruments
                 WHERE name LIKE ? COLLATE NOCASE
                 OR family LIKE ? COLLATE NOCASE`,
                [req.searchTerm, req.searchTerm]
            );
        } else {
            instruments = await db.all(
                "SELECT * FROM instruments"
            );
        }

        res.status(200).json({
            success: true,
            message: instruments.length
                ? "Instruments retrieved successfully"
                : "Nothing found",
            data: instruments
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

// GET one instrument by ID
router.get("/:id", async (req, res) => {
    let db;

    try {
        db = await connectDB();

        const instrument = await db.get(
            "SELECT * FROM instruments WHERE id = ?",
            [req.params.id]
        );

        if (!instrument) {
            return res.status(404).json({
                success: false,
                message: "Instrument not found"
            });
        }

        res.status(200).json({
            success: true,
            data: instrument
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

// POST add new instrument
router.post("/", validateInstrument, async (req, res) => {
    let db;

    try {
        db = await connectDB();

        const { name, family } = req.body;

        const result = await db.run(
            "INSERT INTO instruments (name, family) VALUES (?, ?)",
            [name, family]
        );

        res.status(201).json({
            success: true,
            message: "Instrument added successfully",
            data: {
                id: result.lastID,
                name,
                family
            }
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

// PUT update instrument
router.put("/:id", validateInstrument, async (req, res) => {
    let db;

    try {
        db = await connectDB();

        const { name, family } = req.body;

        const result = await db.run(
            `UPDATE instruments
             SET name = ?, family = ?
             WHERE id = ?`,
            [name, family, req.params.id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Instrument not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Instrument updated successfully",
            data: {
                id: Number(req.params.id),
                name,
                family
            }
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

// DELETE instrument
router.delete("/:id", async (req, res) => {
    let db;

    try {
        db = await connectDB();

        const result = await db.run(
            "DELETE FROM instruments WHERE id = ?",
            [req.params.id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Instrument not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Instrument deleted successfully"
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
