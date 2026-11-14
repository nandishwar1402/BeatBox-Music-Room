const connectDB = require("./db");

async function viewData() {
    const db = await connectDB();

    try {
        console.log("\n--- MUSICIANS ---");
        console.table(await db.all("SELECT * FROM musicians"));

        console.log("\n--- INSTRUMENTS ---");
        console.table(await db.all("SELECT * FROM instruments"));

        console.log("\n--- LOANS ---");
        console.table(await db.all("SELECT * FROM loans"));

    } catch (error) {
        console.error(error.message);
    } finally {
        await db.close();
    }
}

viewData();