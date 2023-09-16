const data = require('../db/database').userData



// Authentication with basicAuth
exports.basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if (!authHeader){
        return res.status(401).json({message: 'You are not authenticated'});
    };

    const bufferString = new Buffer.from(authHeader.split(' ')[1], 'base64');
    const auth = bufferString.toString().split(':');

    const username = auth[0];
    const password = auth[1];

    const existingUser = data.users.find((user) => user.username === username && user.password === password);

    // console.log(auth, data, existingUser);

    if (!existingUser){
        return res.status(401).json({message: 'You are not authenticated'});
    }

    req.user = existingUser;

    next()
}


// Authentication with API_keys
exports.api_Key = (req, res, next) => {
    const authHeader = req.headers;
    console.log(authHeader);
    if (!authHeader.api_key){
        return res.status(401).json({message: 'You are not authenticated'})
    }
    
    const existingUser = data.users.find((user) => user.api_key === authHeader.api_key);
    
    console.log(existingUser);
    if (!existingUser) {
        return res.status(401).json({message: 'You are not authenticated'})
    };

    req.user = existingUser;

    next();
} 



// Check if Admin
exports.checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin'){
        return res.status(403).json({message: 'You are not authorized'})
    };

    next()
}