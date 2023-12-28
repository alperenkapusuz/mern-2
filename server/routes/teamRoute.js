const express = require('express');
const teamController = require('../controllers/teamController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/create').post(roleMiddleware(['admin']), teamController.createTeam);
router.route('/get').get(teamController.getAllTeams);
router.route('/:slug').get(teamController.getTeam);

module.exports = router;