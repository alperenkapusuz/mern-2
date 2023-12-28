const express = require('express');
const leagueController = require('../controllers/leagueController');

const router = express.Router();

router.route('/create').post(leagueController.createLeague);

module.exports = router;