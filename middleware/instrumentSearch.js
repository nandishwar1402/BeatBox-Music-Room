function searchInstruments(req, res, next) {
    const searchTerm = req.query.q;

    if (typeof searchTerm !== "string" || !searchTerm.trim()) {
        return next();
    }

    req.searchTerm = `%${searchTerm.trim()}%`;

    next();
}

module.exports = searchInstruments;