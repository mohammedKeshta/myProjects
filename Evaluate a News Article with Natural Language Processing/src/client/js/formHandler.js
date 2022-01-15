import { checkForURL } from './urlChecker'
//import fetch from 'node-fetch'
import "babel-polyfill";


function handleSubmit(event) {
    event.preventDefault()

    const urlInput = document.getElementById('articleURL').value; //Getting input URL
    /* API Response(s) */
    const text = document.getElementById('text');
    const agreement = document.getElementById('agreement');
    const subjectivity = document.getElementById('subjectivity');
    const confidence = document.getElementById('confidence');
    const irony = document.getElementById('irony');
    const score_tag = document.getElementById('score_tag');

    if (Client.checkForURL(urlInput)) {
        console.log("::: Form Submitted :::")

        postData("http://localhost:8081/api", { url: urlInput })
            .then((res) => {
                text.innerHTML = "Text: " + res.sentence_list[0].text;
                agreement.innerHTML = "Agreement: " + res.agreement;
                subjectivity.innerHTML = "Subjectivity: " + res.subjectivity;
                confidence.innerHTML = "Confidence: " + res.confidence;
                irony.innerHTML = "Irony: " + res.irony;
                score_tag.innerHTML = "Score: " + res.score_tag;
            })
    } else {
        alert('The entered URL is not valid URL')
    }
}
//POST func from previous project at professional track
const postData = async (url = "", data = {}) => {
    console.log('Analyzing Article:', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

export { handleSubmit }