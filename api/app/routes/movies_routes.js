const { URL }    = require('url');
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const fs         = require('fs');
const axios      = require('axios');
const apiKey     = 'ccce14a4';

module.exports = function(app, db) {
    app.get('/movies' , (req, res) => {
        const reqArr = fs.readdirSync(testFolder).map((file) => {
            const fileArr          = file.split('');
            const movieName        = fileArr.slice(0, fileArr.indexOf('(')).join('');
            const movieReleaseYear = fileArr.slice(fileArr.indexOf('(') + 1, fileArr.indexOf(')')).join('');
            const movie            = {
                name : movieName,
                year : movieReleaseYear    
            }
            return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.name}&y=${movie.year}`).then(res => res.data);
        });
        Promise.all(reqArr).then(data => {res.json(data)});
    });
};