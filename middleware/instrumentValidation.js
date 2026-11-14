function validateInstrument(req, res, next) {
    const { name, family } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Instrument name is required"
        });
    }

    if (!family || typeof family !== "string" || !family.trim()) {
        return res.status(400).json({
            success: false,
            message: "Instrument family is required"
        });
    }

    req.body.name = name.trim();
    req.body.family = family.trim();

    next();
}

module.exports = validateInstrument;