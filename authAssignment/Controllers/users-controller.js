const { error } = require('console');
const fs = require('fs');
const path = require('path');


// Database Location
const dbFile = path.normalize(`${__dirname}\\..\\db\\users.json`)

// Database
// const db = fs.readFileSync(dbFile);
// const data = JSON.parse(db);
const data = require('../db/database').userData;

// Function to Handle Response
const handleResponse = (req, res) => ({code, data = null, error = null, message = null}) => {
    return res.status(code).json({data, message, error})
}


// Create User
exports.createUser = (req, res) => {
    const Response = handleResponse(req, res);

    if (!req.body){
        return Response({
            code: 412,
            error: 'Incorrect input data'
        })
    }

    const newUser = req.body;

    const existingUser = data.users.find((user) => newUser.username === user.username);

    if (existingUser) {
        return Response({
            code: 409,
            error: 'User with this username already exists'
        })
    }

    // Assign apikey
    newUser.api_key = `${newUser.username}_${newUser.password}`

    // Assign role
    if (newUser.name === 'odili'){
        newUser.role = 'admin';
    } else {
        newUser.role = 'user'
    };

    data.users = [...data.users, {id: Math.round(Math.random() * 500).toString, ...newUser}];

    // save 
    fs.writeFileSync(dbFile, JSON.stringify(data));

    return Response({
        code: 201,
        data: newUser,
        message: 'Item Created'
    })
}


