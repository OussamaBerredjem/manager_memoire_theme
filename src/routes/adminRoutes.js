const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/',adminController.addAdmin); // POST /api/admins
router.get('/',adminController.getAdmins); // GET /api/admins

module.exports = router;