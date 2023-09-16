const Router = require('express').Router();
const controller = require('../Controllers/items-controller');
const auth = require('../middlewares/global-middlewares')

// Router.use(auth.basicAuth)
Router.use(auth.api_Key)

// POST Requests
Router.post('/', auth.checkAdmin,controller.createItem);

// GET Requests
Router.get('/', controller.getItems);

// GET Requests
Router.get('/:id', controller.getItem);

// PATCH Requests
Router.patch('/:id', auth.checkAdmin, controller.updateItem);

// DELETE Requests
Router.delete('/:id', auth.checkAdmin, controller.deleteItem);


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