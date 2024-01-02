const express = require('express');
const leagueController = require('../controllers/leagueController');
const checkTokenAndRole = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create').post(checkTokenAndRole(['admin']), leagueController.createLeague);
router.route('/get').get(leagueController.getAllLeagues);

module.exports = router;
