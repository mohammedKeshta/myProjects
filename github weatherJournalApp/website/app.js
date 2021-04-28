/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// URL for openweathermap site
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const weatherApiKey = '&appid=06fe79c6c113fb10f118ca0f9be93337';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',generateStatus);

/* Function called by event listener */
function generateStatus(event) {
    //getting the user zipcode from the zipcode entry at the UI
    const zipCode = document.getElementById('zip').value;
    //getting the user feeling from the feelings entry at the UI
    const feeling = document.getElementById('feelings').value;
    /*Call Function to GET Web API Data (from the external API)*/
    getTemperature (baseURL, zipCode, weatherApiKey)
        .then(function(data){
            console.log(data); //self-check @ console to see the data flow in this step
            //Calling the postData function with the data we got from UI & Weather API
            postData('/add', {date: newDate,temp:data.main.temp,content: feeling});
            //Calling the update function to show the data @ the UI
            updateUI();
        })
};

/* Function to GET Web API Data*/
const getTemperature = async (baseURL, newZipCode, ApiKey)=> {
    const getResponse = await fetch (baseURL+newZipCode+ApiKey+'&units=metric');
    try {
        const data = await getResponse.json();
        console.log(data); //self-check @ console to see the data flow in this step
        return data;
    } catch (error) {
        console.log('error', error); //log error msg to the console
    }
}

/* Function to POST data */
const postData = async (url='',data={})=>{
    console.log(data);
    const postResponse =await fetch (url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData= await postResponse.json(); //from json to text to figure where i got the mistake!!!
        //console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error); //log error msg to the console
    }
}

/* Function to GET Project Data from server and update the UI */
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