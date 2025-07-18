const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

router.get('/', ruleController.getRules); // GET /api/rules
router.post('/:id', ruleController.updateRule); // POST /api/rules

module.exports = router;
