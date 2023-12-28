const express = require('express');
const teamController = require('../controllers/teamController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create').post(verifyToken, teamController.createTeam);
router.route('/get').get(verifyToken, teamController.getAllTeams);
router.route('/:slug').get(verifyToken, teamController.getTeam);

module.exports = router;
