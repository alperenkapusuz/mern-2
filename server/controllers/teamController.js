const League = require('../models/League');
const Team = require('../models/Team');

// TUM TAKIMLARI GETIR
exports.getAllTeams = async (req, res) => {
  try {
    const leagueSlug = req.query.league;
    const league = await League.find({ slug: leagueSlug });
    let filter = {};
    if (leagueSlug) filter = { league: league[0]._id.toString() };
    console.log('FILTER: ', filter);
    const teams = await Team.find(filter).sort('-createdAt');
    console.log('TEAMS: ', teams);
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
};

// TAKIM ARA
exports.searchTeam = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Name is required', status: 400 });
    }
    const teams = await Team.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } }).sort('-createdAt');
    if (teams === null) {
      res.status(400).json({ message: 'No teams found', status: 400 });
    }
    res.status(200).json({ data: teams, message: 'Teams fetched successfully', status: 200 });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};

// LIGE GORE TAKIMLARI GETIR
exports.getTeamsByLeague = async (req, res) => {
    try{}catch(err){}
}