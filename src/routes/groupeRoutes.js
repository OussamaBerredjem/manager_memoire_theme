const express = require('express');
const router = express.Router();
const groupeController = require('../controllers/groupeController');


router.get('/:id',groupeController.getGroupeById); // GET /api/groupes/:id
router.get('/',groupeController.getAllGroupes); // GET /api/groupes
router.get('/joined/:id',groupeController.getJoinedGroupeByUserId); // GET /api/groupes/joined/:id


router.post('/update/:id',groupeController.updateGroupe); // POST /api/groupes/update/:id
router.post('/delete/:id',groupeController.deleteGroupe); // DELETE /api/groupes/:id
router.post('/',groupeController.createGroupe); // POST /api/groupes

module.exports = router;

