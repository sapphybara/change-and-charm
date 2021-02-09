const express = require('express');
const router = express.Router();

const {
  aliasTopBites,
  getBiteStats,
  getAllBites,
  createBite,
  getBite,
  updateBite,
  deleteBite,
} = require('../controllers/biteController');

// router.param('id', checkId);

router.route('/top-cheap').get(aliasTopBites, getAllBites);

router.route('/bite-stats').get(getBiteStats);

router.route('/monthly-summary/:year').get(getBiteStats);

router.route('/').get(getAllBites).post(createBite);

router.route('/:id').get(getBite).patch(updateBite).delete(deleteBite);

module.exports = router;
