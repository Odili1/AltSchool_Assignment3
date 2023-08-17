const path = require('path');
const fs = require('fs')


exports.getIndexPage = (req, res) => {
    const fileLocation = '../public/index.html'
    // const html = fs.readFileSync(fileLocation, 'utf-8');
    return res.status(200).send(fileLocation)
};

exports.getErrorPage  = (req, res) => {
    const fileLocation = fs.readFileSync(path.normalize(`${__dirname}\\..\\public\\404.html`), 'utf-8')
    return res.status(404).send(fileLocation)
}