const express = require('express');
const teamController = require('../controllers/teamController');
const checkTokenAndRole = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create').post(checkTokenAndRole(['admin']), teamController.createTeam);
router.route('/get').get(checkTokenAndRole(['user', 'admin']), teamController.getAllTeams);
router.route('/:slug').get(checkTokenAndRole(['user', 'admin']),teamController.getTeam);
router.route('/search').post(checkTokenAndRole(['user', 'admin']), teamController.searchTeam);

module.exports = router;
