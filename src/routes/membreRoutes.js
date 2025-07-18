const express = require('express');
const router = express.Router();
const memberController = require('../controllers/membreController');


router.get('/:id', memberController.getGroupeMembers); // GET /api/membres
router.get('/request/:id', memberController.getRequestMembers); // GET /api/membres/user/:id

router.post('/update/:id', memberController.updateMember); // POST /api/membres/:id
router.post('/delete/:id', memberController.deleteMember); // POST /api/membres/:id
router.post('/', memberController.createMember); // POST /api/membres

module.exports = router;

