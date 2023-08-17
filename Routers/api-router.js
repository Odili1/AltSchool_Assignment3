const Router = require('express').Router();
const controller = require('../Controllers/api-controller');

// POST Requests
Router.post('/items', controller.createItem);

// GET Requests
Router.get('/items', controller.getItems);

// GET Requests
Router.get('/items/:id', controller.getItem);

// PATCH Requests
Router.patch('/items/:id', controller.updateItem);

// DELETE Requests
Router.delete('/items/:id', controller.deleteItem);


// BAD Requests
Router.get('*', (req, res) => {
    if (req.url) {
        return res.status(400).json({
            message: 'Bad Request'
        })
    };

    return res.status(500).json({
        message: 'Internal Server Error'
    })
})


module.exports = Router