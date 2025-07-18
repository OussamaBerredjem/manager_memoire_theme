// src/routes/projetRoutes.js
const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController');
const {isTeacher } = require('../middlewares/authMiddleware');


// Routes for project-related actions
router.get('/disponible', projetController.getProjectDisponnible); // GET /api/projets
router.post('/',isTeacher, projetController.createProjet); // POST /api/projets
router.post('/update/:id',isTeacher, projetController.updateProjet); // POST /api/projets/update
router.get('/', projetController.getAllProjets); // GET /api/projets
router.get('/:id', projetController.getProjetById); // GET /api/projets/:id

router.delete('/:id',isTeacher, projetController.deleteProjet); // DELETE /api/projets/:id


module.exports = router;
