const path = require('path')
const express = require('express');
const itemRoutes = require('./Routers/items-router');
const userRoutes = require('./Routers/users-router');

// Initialize app
const app = express();

// Express Middlerware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/v1/items', itemRoutes);
app.use('/v1/users', userRoutes);

// Error
app.use('*', (req, res) => {
    if (req.url) {
        return res.status(400).json({
            message: 'Bad Request'
        })
    };

    return res.status(500).json({
        message: 'Internal Server Error'
    })
})
console.log('hey');

// PORT
const port  = 5010;


// Create server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})