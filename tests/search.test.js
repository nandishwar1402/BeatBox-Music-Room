const searchInstruments = require("../middleware/instrumentSearch");

function testSearch(query) {
    const req = { query };
    const res = {};

    searchInstruments(req, res, () => {
        console.log("Search term:", req.searchTerm || "No search filter");
    });
}

console.log("Test 1: Search Guitar");
testSearch({ q: "Guitar" });

console.log("\nTest 2: Search uppercase");
testSearch({ q: "GUITAR" });

console.log("\nTest 3: No search term");
testSearch({});