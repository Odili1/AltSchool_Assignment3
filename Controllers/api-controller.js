// const { response } = require('express');
const { log } = require('console');
const fs = require('fs');
const path = require('path');


// Database Location
const dbFile = path.normalize(`${__dirname}\\..\\db\\items.json`)

// Database
const db = fs.readFileSync(dbFile);
const data = JSON.parse(db);

// Function to Handle Response
const handleResponse = (req, res) => ({code, data = null, error = null, message = null}) => {
    return res.status(code).json({data, message, error})
}

// Create Item (POST)
exports.createItem = (req, res) => {
    const Response = handleResponse(req, res);
    if (!req.body){
        return Response({
            code: 412,
            error: 'Incorrect input data'
        })
    }

    data.items = [...data.items, {...req.body, id: Math.floor(Math.random() * 500).toString()}];

    fs.writeFileSync(dbFile, JSON.stringify(data));

    return Response({
        code: 201,
        data: req.body,
        message: 'Item Created'
    })
    
}



// Get all Items (GET)
exports.getItems = (req, res) => {
    const Response = handleResponse(req, res);
    
    console.log(req.query);
    if (!data.items.length){
        return Response({
            code: 404,
            message: 'No data found'
        });
    };

    if (req.query && req.query.size){
        const filteredData = data.items.filter((item) => item.size === req.query.size)
        console.log(filteredData);
        return Response({
            code: 200,
            data: filteredData,
            message: 'Data found'
        })
    }

    Response({
        code: 200,
        data: data,
        message: 'Data Found'
    })
}


// Get One Item (GET)
exports.getItem = (req, res) => {
    const Response = handleResponse(req, res);

    // Check Item in the Database
    const findIndex = data.items.findIndex((item) => item.id === req.params.id);
    
    // If not found
    if (findIndex === -1){
        return Response({
            code: 404,
            error: 'Item not Matched'
        })
    };

    // if found
    const foundItem = data.items[findIndex];
    
    return Response({
        code: 200,
        data: foundItem,
        message: 'Item Found'
    })
}


// Updata item (UPDATE)
exports.updateItem = (req, res) => {
    const Response = handleResponse(req, res);
    
    // Check for item
    const findIndex = data.items.findIndex((item) => item.id === req.params.id);
    
    // If not found
    if (findIndex === -1){
        return Response({
            code: 404,
            error: 'Item not Matched'
        })
    };
    
    // if found
    const updatedItem = {...data.items[findIndex], ...req.body};
    data.items.splice(findIndex, 1, updatedItem);

    // Save to Database
    fs.writeFileSync(dbFile, JSON.stringify(data))
    
    // Return Response
    return Response({
        code: 202,
        data: updatedItem,
        message: 'Item Updated Succesfully'
    })
}


// Delete Item (DELETE)
exports.deleteItem = (req, res) => {
    const Response = handleResponse(req, res);

    // Check for item
    const findIndex = data.items.findIndex((item) => item.id === req.params.id);
    
    // If not found
    if (findIndex === -1){
        return Response({
            code: 404,
            error: 'Item not Matched'
        })
    };

    // If found
    const foudnItem = data.items[findIndex];

    // Delete Item
    data.items.splice(findIndex, 1);

    // Save New Modification to Database
    fs.writeFileSync(dbFile, JSON.stringify(data));

    // Send Response
    return Response({
        code: 202,
        data: foudnItem,
        message: 'Item Deleted Succesfully'
    })
}


