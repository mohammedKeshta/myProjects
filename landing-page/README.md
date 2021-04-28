# Landing Page Project

## Table of Contents

* [Description](#description).
* [Details](#details).
* [Acquired_knowledge](#acquired_knowledge).

### Description

  * This project is the first project at the Front-end Web development professional track from [EGFWD](https://egfwd.com/?lang=ar) in co-operation with [UDACITY](https://www.udacity.com/) international organization.

  * The project is about converting this landing page from a static page to an interactive one.

  * The project combines the knowledge of:
    * HTML
    * CSS
    * And Mainly, JavaScript language.

### Details

  * `index.html` part:
    * The starter code was used.
    * The JavaScript file was linked.
    * The fourth section was added.

  * `styles.css` part:
    * Adding a class with the name : "item-active-class" in order to manipulate the navigation bar items highlighting:
    ```CSS
    .item-active-class {
        background-color: #FFFF00;
    }
    ```
    * The Footer styles were modified to show the navigation bar
  * `app.js` part:
    * some variables were used to query for sections and to add them Dynamically and to add a corresponding items at the navigation bar linked to them:
    ```javascript
    const sections = document.querySelectorAll('section'); //getting all sections and put it in a variable

    const navList = document.getElementById('navbar__list'); //define a variable that will construct my Unordered list

    const fragment = document.createDocumentFragment(); // adding a fragment to add all the changes to it in one time.(for good performance to minimize the reflow)

    let newListElemnt = document.createElement('li'); //adding new section

    let listELementName = sections[i].getAttribute('data-nav'); //getting the name from the creatd section

    ```
    * Also some eventListeners were used to highlight the active sections and its corresponding items at the navigation bar when the mouse scrolls:
    ```javascript
    // add an event listener to scroll smoothly to the required section
    linkToSection.addEventListener('click',function smoothScroll (){/*with the required code*/});
    ```
    ```javascript
    //adding an eventListener to detect the active section when scrolling
    window.addEventListener('scroll', function setActiveSection (){/*with the required code*/});
    ```
### Acquired_knowledge:

  * New eventListeners
  * New Usage of classes
  * How to manipulate HTML and CSS files without changing it directly ;)
