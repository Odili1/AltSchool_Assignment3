const Router = require('express').Router();
const controller = require('../Controllers/web-controller');


Router.get('/index.html', controller.getIndexPage);

Router.get('*', controller.getErrorPage)

module.exports = Router