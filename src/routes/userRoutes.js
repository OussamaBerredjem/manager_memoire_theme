const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/signup', userController.createUser); // POST /api/users (for account creation)
router.get('/:id', userController.getUserById); // GET /api/users/:id (to fetch user by ID)
router.get('/others/list', userController.otherUserList); // GET /api/users/other (to fetch user list )
router.get('/list/status',userController.etudiantListWithProjet)//GET /api/users/list-avec-status
router.get('/', userController.userList); // GET /api/users/list (to fetch user list )
// Route to complete the user profile
router.post('/complete/:id', userController.completeProfile); // PUT /api/users/complete/:id
router.post('/delete/:id', userController.removeUser); // PUT /api/users/complete/:id

// Route to update the user profile
router.post('/update/:id', userController.updateProfile); // PUT /api/users/update/:id

module.exports = router;
