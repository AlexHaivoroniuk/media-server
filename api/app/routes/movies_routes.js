const { URL }  = require('url');
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const fs = require('fs');

module.exports = function(app, db) {
    app.get('/movies' , (req, res) => {
        const movies = [];
        console.log(fs.readdirSync(testFolder));
        fs.readdirSync(testFolder).forEach(file => {
            movies.push(file);
            console.log(file);
        })
        console.log(movies);
        res.send('Success');
    });
};