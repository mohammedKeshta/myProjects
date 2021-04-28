// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance (to over pass the security issues when dealing with the server)
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//choosing port
const port = 3883;
//spin up server
const server =app.listen(port,listening);
// Callback to debug and be sure that the server is running on which port
function listening (){
    console.log(`Server is running at localhost: ${port}`);
}

// Initialize all route with a callback function

// GET route
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req,res){
    res.send(projectData);
}

// Post Route
app.post('/add', setData);
// Callback function to complete GET '/add'
function setData (req, res){
    //making a new entry to projectdata End-point
    newDataEntry = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.content
    };
    //assigning data to the object
    projectData = Object.assign(newDataEntry);
}