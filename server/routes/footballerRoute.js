const express = require('express');
const footballerController = require('../controllers/footballerController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create').post(verifyToken,footballerController.createFootballer);
router.route('/get').get(verifyToken,footballerController.getAllFootballers);
router.route('/get/:teamId').get(verifyToken,footballerController.getFootballersByTeam);
router.route('/update/:footballerId').put(verifyToken,footballerController.updateFootballer);

module.exports = router;