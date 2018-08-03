const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const PopulateDb    = require('./app/middleware/PopulateDbWithMovie');
const {url, port}   = require('./config/config');
const app           = express();

mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({ extended: true}));
const db = mongoose.connect(url, { useNewUrlParser: true })
                    .then( () => { 
                        console.log('MongoDB Connected');
                    })
                    .catch((err) => {
                        console.error('Failed to open Mongodb Connection: ', err.message);
                        process.exit(1);
                    })
app.use('/movies', PopulateDb)
require('./app/routes')(app);
app.listen(port, () => {
    console.log(`Server Live on: ${port}`);
})
