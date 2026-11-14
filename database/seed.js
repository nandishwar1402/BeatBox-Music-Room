const connectDB = require("./db");

async function insertSampleData() {
    const db = await connectDB();

    try {
        // Musicians
        await db.run(`
            INSERT INTO musicians (name) VALUES
            ('Rahul'),
            ('Arjun'),
            ('Priya')
        `);

        // Instruments
        await db.run(`
            INSERT INTO instruments (name, family) VALUES
            ('Guitar', 'Strings'),
            ('Piano', 'Keyboard'),
            ('Drums', 'Percussion')
        `);

        // Loans
        await db.run(`
            INSERT INTO loans
            (musician_id, instrument_id, loan_date, return_date)
            VALUES
            (1, 1, '2026-11-10', '2026-11-20'),
            (2, 2, '2026-11-11', '2026-11-21'),
            (3, 3, '2026-11-12', '2026-11-22')
        `);

        console.log("Sample records inserted successfully!");
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await db.close();
    }
}

insertSampleData();