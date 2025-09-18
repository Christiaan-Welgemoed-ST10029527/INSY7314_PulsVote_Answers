// server.js
const app = require('./app');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Check if SSL files exist, if not, use HTTP instead
let useHTTPS = false;
let options = {};

try {
  options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
  };
  useHTTPS = true;
  console.log('SSL certificates found, starting HTTPS server...');
} catch (error) {
  console.log('SSL certificates not found, starting HTTP server...');
  useHTTPS = false;
}

if (useHTTPS) {
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
  });
} else {
  // Fallback to HTTP if SSL certificates are not available
  const http = require('http');
  http.createServer(app).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}