const Footballer = require('../models/Footballer');

// FUTBOLCU OLUSTUR
exports.createFootballer = async (req, res) => {
  console.log('create footnaller');
  try {
    await Footballer.create(req.body);
    res.status(201).json({ message: 'Footballer created successfully', status: 201 });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};

// TUM FUTBOLCULARI GETIR
exports.getAllFootballers = async (req, res) => {
  try {
    const footballers = await Footballer.find().sort('-createdAt');
    res.status(200).json({ data: { footballers }, message: 'Footballers fetched successfully', status: 200 });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};

// TAKIMINA GORE FUTBOLCU GETIR
exports.getFootballersByTeam = async (req, res) => {
  try {
    const footballers = await Footballer.find({ team: req.params.teamId }).sort('-createdAt');
    res.status(200).json({ data: { footballers }, message: 'Footballers fetched successfully', status: 200 });
  } catch (err) {}
};

// FUTBOLCU GUNCELLE
exports.updateFootballer = async (req, res) => {
  try {
    await Footballer.findByIdAndUpdate(req.params.footballerId, req.body);
    res.status(200).json({ message: 'Footballer updated successfully', status: 200 });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};
