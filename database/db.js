const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

async function connectDB() {
    const db = await open({
        filename: path.join(__dirname, "beatbox.db"),
        driver: sqlite3.Database
});
await db.exec("PRAGMA foreign_keys = ON");

    console.log("SQLite database connected successfully");

    // Create Musicians table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS musicians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Create Instruments table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS instruments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            family TEXT NOT NULL
        )
    `);

    // Create Loans table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS loans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            musician_id INTEGER NOT NULL,
            instrument_id INTEGER NOT NULL,
            loan_date TEXT,
            return_date TEXT,
            FOREIGN KEY (musician_id) REFERENCES musicians(id),
            FOREIGN KEY (instrument_id) REFERENCES instruments(id)
        )
    `);

    console.log("All three tables created successfully");

    return db;
}

module.exports = connectDB;