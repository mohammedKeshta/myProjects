# Would You Rather Project

## Table of Contents:

* [Pre_Notification](#pre_notification)
* [Description](#description).
* [Details](#details).
* [Code_Overview](#code_quick_overview).
* [Acquired_Knowledge](#acquired_knowledge).
* [External_Material](#external_material).

### Pre_Notification
    The application was created with create-react-app and requires only "yarn install" or "npm install" (in order to install all node modules required), and "yarn start" "npm start" to get it launched. I used the 'create-react-app' to make a new project and just added the `_DATA.js` file from starter code.

### Description

   * This is the 1st Project at the Udacity ND Advanced Web Development Track. It is about the famous "Would You Rather" game, which allows you to (choose an answer of an existing question or add a new question with two choices).
   * After login with the authorized user you will have 3 internal tabs:
    * Home: which has the answered and unanswered questions for the current user
    * New Poll: which allows you to add a new question
    * Leaderboard: which has the order of the users depending on the (total number of question they answered and the added ones)

### Details

   * The App consists of:
    * Front-End Part:
       Which consists of :
        * 4 Actions files (`authedUser.js`, `questins.js`, `shared.js`, & `users.js`) : which is Redux Components (chirper app like)
        * 4 Reducers files(`authedUser.js`, `index.js`, `questions.js`, & `users.js`): which is Redux Components (chirper app like)
        * 2 Middlewares files(`index`, & `logger`) : which is Redux Components (chirper app like)
        * 15 UI React Components files.

    * Back-End Part:
        The `_DATA.js` file represents a fake database and methods that let you access the data + the `api.js` file.

### Code_Overview
    This is A quick but not full overwiew about what code we implemented
   * Main Page `App.js`  :
    * what was imported:
        ```javascript
        import React, { Component, Fragment } from 'react' //React default
        import { BrowserRouter, Route, Switch } from 'react-router-dom' // for setting routes between pages
        import { connect } from 'react-redux' //to connect the Redux store with the UI components
        import { handleInitialData } from '../actions/shared' //which deals with the actions of the store
        //import LoadingBar from 'react-redux-loading' // from chirper to load when app gets the data (wasn't used)
        //import 'bootstrap/dist/css/bootstrap.min.css' //(wasn't used)
        import 'semantic-ui-css/semantic.min.css' // semantic styling
        import ContentGrid from './ContentGrid' //UI comp
        import LogIn from './LogIn' //UI comp responsible for Login
        import NavBar from './NavBar' //UI comp responsible for navigation bar at the home page
        import Home from './Home'  //UI comp
        import PageNotFound from './PageNotFound' // UI comp
        import UserInfo from './UserInfo' //UI Comp
        import NewPoll from './NewPoll' //UI comp
        import Leaderboard from './Leaderboard' //UI comp
        ```
   * `YourChoice.js` UI component:
    ```javascript
        <Label color="orange" ribbon="right" className="vote">
            <Icon name="check circle outline" size="big" className="compact" />
                <div style={{ float: 'right' }}>
                    Your
                    <br />
                    Choice
                </div>
        </Label>
    ```

### Acquired_Knowledge
   * How to use [Redux](https://redux.js.org/) in Building projects using React.JS framework especially the ones with different state management components. Because it is more Perdictable, Centralized, Debuggable, & Flexible way than React.
   * How to divide projects into smaller usable components
   *how to minimize the change at the DOM and instead make the changes to virtual DOM to save processing power and webpage interaction speed [for more info](https://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
   * How to use Routes and Links to maintain the Ease of navigation between Pages of the App

### External_Material
    I have tried to use react-bootstrap package to have a 'good-looking' app but i failed to do so..
    So i looked for other ways and find the Semantic-ui package and took [this_project](https://github.com/james-priest/reactnd-project-would-you-rather/tree/master/src/components) as a referrence.
