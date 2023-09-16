const fs = require('fs');
const path = require('path');


// User Database connection
// Database Location
const userdbFile = path.normalize(`${__dirname}\\..\\db\\users.json`)

// Database
const userdb = fs.readFileSync(userdbFile);
exports.userData = JSON.parse(userdb);


// Item Database connection
// Database Location
const itemdbFile = path.normalize(`${__dirname}\\..\\db\\items.json`)

// Database
const itemdb = fs.readFileSync(itemdbFile);
exports.itemData = JSON.parse(itemdb);