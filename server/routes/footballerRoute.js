const express = require('express');
const footballerController = require('../controllers/footballerController');
const checkTokenAndRole = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create').post(checkTokenAndRole(['admin']), footballerController.createFootballer);
router.route('/get').get(checkTokenAndRole(['user', 'admin']), footballerController.getAllFootballers);
router.route('/get/:teamId').get(checkTokenAndRole(['user', 'admin']), footballerController.getFootballersByTeam);
router.route('/update/:footballerId').put(checkTokenAndRole(['admin']), footballerController.updateFootballer);

module.exports = router;
