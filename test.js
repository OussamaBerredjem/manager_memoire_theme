const express = require('express');
const axios = require('axios');

const app = express();
const port = 3003;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle the login request
async function login(){
    const email = "teacher@gamil.com"; // Get email and password from the request body
    const motDePasse = "123456"; // Get email and password from the request body

    // URL of your login server
    const loginServerUrl = 'http://localhost:3000/api/auth/login';

    // Headers for the request
    const headers = {
        Authorization: 'Bearer 78heoytx56drg4ezd163dfjjs3', // Authorization header
        'Content-Type': 'application/json', // Content-Type header
    };

    // Request body
    const body = {
        email: email,
        motDePasse: motDePasse,
    };

    try {
        // Make the POST request using Axios
        const response = await axios.post(loginServerUrl, body, { headers });

        // Log the response from the login server to the terminal
        console.log('Login Server Response:', response.data);

        // Send the response back to the client
    } catch (error) {
        // Handle errors
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Login Server Error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the login server');
        } else {
            // Something happened in setting up the request
            console.error('Error setting up the request:', error.message);
        }
    }
}

login();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});