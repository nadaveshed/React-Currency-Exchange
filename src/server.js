const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')  //use this

const app = express();
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

require('../src/routes.js')(app);

app.listen(3001, function () {
    console.log('App listening on port 3001!');
});