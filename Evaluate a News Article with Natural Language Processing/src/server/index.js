var path = require('path')
//const fetch = require('node-fetch') // didn't work as it supposed to
const axios = require('axios');
const express = require('express')

const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(express.static('dist'))

/* Dependencies */ //from my weather Journal from previous professional course
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance (to over pass the security issues when dealing with the server)
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/api', async function (req, res) {
    const url = req.body.url
    console.log(req.body)
    const response = await axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${url}&lang=en`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('error', error);
        })
    res.send(response)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App listening on port 8081!')
})

// export app to use it in the unit testing
module.exports = {
    app
}