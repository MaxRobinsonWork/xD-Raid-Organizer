const fs = require('fs');
const path = require('path');

// Read the environment variables from GitHub Repository Variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Read the original script.js file
const scriptPath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace placeholders with actual values
scriptContent = scriptContent.replace(/process\.env\.CLIENT_ID/g, `'${CLIENT_ID}'`);
scriptContent = scriptContent.replace(/process\.env\.CLIENT_SECRET/g, `'${CLIENT_SECRET}'`);

// Write the updated script.js file
fs.writeFileSync(scriptPath, scriptContent, 'utf8');

console.log('Pre-build script completed: CLIENT_ID and CLIENT_SECRET injected.');
