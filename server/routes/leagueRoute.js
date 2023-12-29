const express = require('express');
const leagueController = require('../controllers/leagueController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create').post(verifyToken,leagueController.createLeague);
router.route('/get').get(verifyToken,leagueController.getAllLeagues);

module.exports = router;