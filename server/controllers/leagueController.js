const League = require('../models/League');

// LIG OLUSTUR
exports.createLeague = async (req, res) => {
    try {
        await League.create(req.body);
        res.status(201).json({ message: 'League created successfully', status: 201 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 });
    }
}

