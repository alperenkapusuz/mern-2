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

// TUM LIGLERI GETIR
exports.getAllLeagues = async (req, res) => {
    try {
        const leagues = await League.find().sort('-createdAt');
        res.status(200).json({ data: { leagues }, message: 'Leagues fetched successfully', status: 200 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 });
    }
}