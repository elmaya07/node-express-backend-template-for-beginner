'use strict';
import fs from 'fs'; // Import the file system module to read files
import path from 'path'; // Import the path module to handle file paths
import Sequelize from 'sequelize'; // Import Sequelize to work with the database
import logger from '../utils/logger'; // Import a custom logger to track events

const basename = path.basename(__filename); // Get the current file name (index.js)
const env = process.env.NODE_ENV || 'development'; // Set the environment (default to 'development')
import config from '../config/sequelize.js'; // Load the Sequelize configuration for the current environment

const db = {}; // Create an empty object to store our database models

// Create a new Sequelize instance based on the environment configuration
let sequelize;
if (config[env].use_env_variable) {
	// If using an environment variable for the database URL
	sequelize = new Sequelize(process.env[config[env].use_env_variable], config[env]);
} else {
	// Otherwise, use the configuration object directly
	sequelize = new Sequelize(
		config[env].database,
		config[env].username,
		config[env].password,
		config[env]
	);
}

// Authenticate with the database to ensure the connection is successful
sequelize.authenticate().then(
	() => {
		logger.info('Sequelize authentication successful'); // Log success
	},
	(err) => {
		logger.error('Sequelize authentication error', { err }); // Log error details
	}
);

// Read and initialize model definitions from the current directory
fs.readdirSync(__dirname) // Read the files in the current directory
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		); // Exclude non-JS files and this file (index.js)
	})
	.forEach((file) => {
		// Import and initialize each model file
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model; // Add the model to the db object
	});

// Set up associations (relationships) between models
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db); // Call the associate method on each model
	}
});

// Add the Sequelize instance and the Sequelize library to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object so it can be used in other parts of the application
export default db;
