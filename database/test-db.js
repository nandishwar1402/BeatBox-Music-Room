const connectDB = require("./db");

async function testDatabase() {
    try {
        const db = await connectDB();

        const tables = await db.all(`
            SELECT name
            FROM sqlite_master
            WHERE type = 'table'
            ORDER BY name
        `);

        console.log("\nDatabase tables:");

        tables.forEach((table) => {
            console.log(table.name);
        });

        await db.close();
        console.log("\nDatabase test completed successfully!");
    } catch (error) {
        console.error("Database error:", error.message);
    }
}

testDatabase();