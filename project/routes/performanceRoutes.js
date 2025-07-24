const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

router.post('/create', performanceController.createReview);
router.get('/all', performanceController.getAllReviews);
router.get('/:performance_id', performanceController.getReviewById);
router.put('/:performance_id', performanceController.updateReview);
router.delete('/:performance_id', performanceController.deleteReview);

module.exports = router;