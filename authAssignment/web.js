const path = require('path')
const express = require('express');
const routes = require('./Routers/web-router')

// Initialize app
const app = express();

// Express Middlerware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Error
app.use('*', routes)

// PORT
const port  = 5050;


// Create server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})