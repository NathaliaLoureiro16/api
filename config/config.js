var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Populate the DB with sample data
config.seedDB = false;

// Server settings
config.server = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000
};

// MongoDB settings
config.mongodb = {
    dbURI: "mongodb://127.0.0.1:27017/json"
};

// Export configuration object
module.exports = config;