const Router = require('express').Router();
const controller = require('../Controllers/users-controller');



// POST Requests
Router.post('/', controller.createUser);

// GET Requests
Router.get('/');

module.exports = Router