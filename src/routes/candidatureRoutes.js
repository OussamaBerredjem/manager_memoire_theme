// src/routes/candidatureRoutes.js
const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');
const {isTeacher } = require('../middlewares/authMiddleware');

// Routes for managing candidatures
router.post('/', candidatureController.createCandidature); // POST /api/candidatures
router.get('/', candidatureController.getCandidatureProjet); // GET /api/candidatures
router.get('/membres', candidatureController.projetMembre); // GET /api/candidatures
router.get('/envoyer', candidatureController.getCandidatureEnvoyer); // GET /api/candidatures

router.post('/update/:id',isTeacher, candidatureController.updateCandidature); // GET /api/candidatures
router.post('/delete/:id', candidatureController.deleteCandidature); // GET /api/candidatures

module.exports = router;
