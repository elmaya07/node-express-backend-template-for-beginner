// Load environment variables from a .env file
import 'dotenv-flow/config.js';

// Import the Express.js framework to create a web server
import express from 'express';
const app = express();

// Import middleware for security and logging
import cors from 'cors'; // Allows cross-origin requests
import helmet from 'helmet'; // Adds security headers
import router from './routes/router.js';
// import logger from './utils/logger.js'; // Custom logging utility

// Configure Express to parse JSON and URL-encoded data
app.use(express.json()); // Automatically parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different domains
app.use(cors());

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Disable the "X-Powered-By" header to prevent disclosing server technology
app.disable('x-powered-by');

// Define your application routes here
// Example: app.get('/api/example', (req, res) => { ... });

// Catch-all route for unhandled requests, responds with a simple message
// app.use((_req, res) => {
//     return res.status(200).send('Back-end for');
// });
app.use('/api/v1', router)

// Get the port number from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    // Log a message to indicate the server is running
    console.info(`App Listening on port ${port}`);
});
