const League = require('../models/League');
const Team = require('../models/Team');

// TUM TAKIMLARI GETIR
exports.getAllTeams = async (req, res) => {
  try {
    const leagueSlug = req.query.leagues;
    const league = await League.findOne({ slug: leagueSlug });
    let filter = {};
    if (leagueSlug) filter = { league: league._id };
    const teams = await Team.find(filter).sort('-createdAt');
    const leagues = await League.find({});
    res.status(200).json({ data: { teams }, message: 'Teams fetched successfully', status: 200 });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};

// TAKIM EKLE
exports.createTeam = async (req, res) => {
  try {
    await Team.create(req.body);
    res.status(201).json({ message: 'Team created successfully', status: 201 });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};


// TAKIM DETAYI GETIR
exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findOne({ slug: req.params.slug });
        res.status(200).json({ data: team, message: 'Team fetched successfully', status: 200 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 });
    }
}