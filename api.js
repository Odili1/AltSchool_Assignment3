const path = require('path')
const express = require('express');
const routes = require('./Routers/api-router')

// Initialize app
const app = express();

// Express Middlerware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/v1', routes);

// Error
app.use('*', routes)
console.log('hey');

// PORT
const port  = 5010;


// Create server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})