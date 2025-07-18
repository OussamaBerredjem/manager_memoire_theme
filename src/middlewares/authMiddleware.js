const jwt = require('jsonwebtoken');

// Function to verify the token
exports.verifyToken = (req, res, next) => {
  // Debugging: Check the full request URL
  console.log("Requested path:", req.originalUrl);  // Using originalUrl for full route

  // Extract Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // Extract the token from the Bearer token (Authorization: Bearer <token>)
  const token = authHeader.split(' ')[1];  // Split the 'Bearer <token>' and get the token part
  console.log(req.originalUrl);
  
  // Check if it's a login/signup route and verify the server token
  if (req.originalUrl === '/api/users/signup' || req.originalUrl === '/api/auth/login') {
    // Verify server token (for login/signup requests)
    const serverToken = process.env.SERVER_TOKEN;

    if (token !== serverToken) {
      return res.status(403).json({ error: 'Invalid server token' });
    }

    next(); // Proceed with the request (this is typically for server-side validation)
  
  } else {
    // For other routes, we verify the user token (for accessing protected routes)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to authenticate token skiped :'+err });
      }

      // Attach user info to the request object for further processing
      req.userId = decoded.id;
      req.userRole = decoded.role;

      next(); // Proceed to the next middleware or route
    });
  }
};

// Middleware to check if the user is a student
exports.isStudent = (req, res, next) => {
  if (req.userRole !== 'Etudiant') {
    return res.status(403).json({ error: 'Permission denied: Student role required' });
  }
  next();
};

// Middleware to check if the user is a teacher
exports.isTeacher = (req, res, next) => {
  if (req.userRole !== 'Enseignant') {
    return res.status(403).json({ error: 'Permission denied: Teacher role required' });
  }
  next();
};
