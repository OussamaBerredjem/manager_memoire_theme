// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const projetRoutes = require('./routes/projetRoutes');
const candidatureRoutes = require('./routes/candidatureRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const groupeRoutes = require('./routes/groupeRoutes');
const membreRoutes = require('./routes/membreRoutes');
const ruleRoute = require('./routes/ruleRoutes');
const adminRoute = require('./routes/adminRoutes');
const cors = require('cors');


const { verifyToken, isStudent, isTeacher } = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Handle preflight requests
app.options('*', cors()); // Allow preflight requests for all routes

// Auth routes
app.use('/api/auth',verifyToken, authRoutes);

// User routes (accessible to authenticated users)
app.use('/api/users', verifyToken, userRoutes);

// Project routes (accessible to authenticated users, only teachers for creating)
app.use('/api/projets', verifyToken, projetRoutes);

// Candidature routes (students can apply to projects)
app.use('/api/candidatures', verifyToken, candidatureRoutes);

app.use('/api/messages', verifyToken, messageRoutes);
app.use('/api/notifications', verifyToken, notificationRoutes);
app.use('/api/groupe', verifyToken, groupeRoutes);
app.use('/api/membre', verifyToken, membreRoutes);
app.use('/api/rules', verifyToken, ruleRoute);
app.use('/api/admins', verifyToken, adminRoute);

module.exports = app;
