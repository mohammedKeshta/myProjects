# Weather-Journal App Project

## Table of Contents

* [Description](#description).
* [Details](#details).
* [Code_Overview](#code_quick_overview).
* [Acquired_knowledge](#acquired_knowledge).

### Description
* This project is an asynchronous web app that uses Web API and user data to dynamically update the UI.
* This project is the second project at the Front-end Web development professional track from [EGFWD](https://egfwd.com/?lang=ar) in co-operation with [UDACITY](https://www.udacity.com/) international organization.

### Details
 * Used Environment and packages:
    * Node.js Environment
    * Express Package
    * CORS Package
    * body-parser Package
 * Server:
   A local server was used
 * Extras:
   API Credentials from [OpenWeatherMap.com](https://openweathermap.org/) were used to get the weather condition (i.e. temperature)

### Code_Quick_Overview
 * `Server.js` part:
    * a GET Route was established :
        ```javascript
        // GET route
        app.get('/all', sendData);
        // Callback function to complete GET '/all'
        function sendData(req,res){
        res.send(projectData);
        }
        ```
    * a POST Route was established :
        ```javascript
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
        ```
 * `app.js` part:
    * Credintials for OpenWeatherMap API was set:
        ```javascript
        // URL for openweathermap site
        let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
        // Personal API Key for OpenWeatherMap API
        const weatherApiKey = '&appid=06fe79c6c113fb10f118ca0f9be93337';
        ```
    * UIupdate function was made to update the UI with information taken from the weatherAPI and the UI itself:
        ```javascript
        * Function to GET Project Data from server and update the UI */
        const updateUI = async ()=> {
            const updateRequest = await fetch('/all');
            try {
                const allData = await updateRequest.json();
                //showing the date of today by setting it with data from Server
                document.getElementById('date').innerHTML = String.fromCodePoint(0x1F4C6)+ ' The date of the today is: '+ allData.date;
                //showing the temperature corresponding to the zipCode by setting it with data from Server
                document.getElementById('temp').innerHTML =  String.fromCodePoint(0x1F321)+' The temperature Now is: '+allData.temp +'  C°';
                //showing the feelings of the user by setting it with data from Server
                document.getElementById('content').innerHTML = String.fromCodePoint(0x1F642)+' You are feeling : '+ allData.feeling;
            } catch (error) {
                console.log('error', error); //log error msg to the console
            }
        }
        ```
 * small changes were done to the HTML & css files.

### Acquired_knowledge
 * Know how to deal with servers (GET & POST)
 * Know how to deal with APIs
 * Know how to use Asynchronous communication
 * Know how to use Chaining Promises