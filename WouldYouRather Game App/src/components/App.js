import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
//import LoadingBar from 'react-redux-loading' // from chirper (didn't work!!)
import 'semantic-ui-css/semantic.min.css'
import ContentGrid from './ContentGrid'
import LogIn from './LogIn'
import NavBar from './NavBar'
import Home from './Home'
import PageNotFound from './PageNotFound'
import UserInfo from './UserInfo'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData()) // first things first
  }

  render() {

    return (
      // if the condition of the user is null ask for login again, if not show authorized paths
      <BrowserRouter>
        {/*<LoadingBar/>*/}
        <div>
          {this.props.authedUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <LogIn />
                </ContentGrid>)}
            />)
            : (
              <Fragment>
                <NavBar />
                <ContentGrid>
                  <Switch>
                    <Route exact path='/' component={Home} /> {/* Home dierctory and it should be exact */}
                    <Route path="/questions/unauthorized_user" component={PageNotFound} /> {/* for unathorized actions */}
                    <Route path="/questions/:question_id" component={UserInfo} />{/* showing the questions by ID */}
                    <Route path="/add" component={NewPoll} /> {/* add new question path */}
                    <Route path="/leaderboard" component={Leaderboard} /> {/* show the users order @ leader board */}
                    <Route component={PageNotFound} /> {/* for wrong paths */}
                  </Switch>
                </ContentGrid>
              </Fragment>
            )
          }
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser // the only data we need here from the Database
  }
}

export default connect(mapStateToProps)(App) // connecting the App UI comp with Redux Store