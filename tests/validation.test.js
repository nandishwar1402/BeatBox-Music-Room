const validateInstrument = require("../middleware/instrumentValidation");

function testValidation(data) {
    const req = { body: data };
    const res = {
        statusCode: 200,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(response) {
            console.log("Status:", this.statusCode);
            console.log("Response:", response);
        }
    };

    validateInstrument(req, res, () => {
        console.log("Validation passed:", req.body);
    });
}

console.log("Test 1: Valid data");
testValidation({ name: "Guitar", family: "Strings" });

console.log("\nTest 2: Missing name");
testValidation({ family: "Strings" });

console.log("\nTest 3: Missing family");
testValidation({ name: "Guitar" });