import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProgressBar, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//import YourChoice from './YourChoice'
import YourChoice from './YourChoice2' // tesssting boot strap
class PollResult extends Component {

    handleClick = () => {
        this.props.history.push('/');
    };

    render() {
        const { question, user } = this.props;
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const totalVotes = optionOneVotes + optionTwoVotes;
        const userVote = user.answers[question.id];
        return (
            <div>
                <h3>
                    Poll Results:
                </h3>
                <br />
                <div>
                    {userVote === 'optionOne' && <YourChoice />}
                    <h3 style={{ fontWeight: 'bold' }}>{question.optionOne.text}</h3>
                    <ProgressBar variant="info" now={((optionOneVotes / totalVotes) * 100).toFixed(2)} label={`${((optionOneVotes / totalVotes) * 100).toFixed(2)}%`} />
                    {optionOneVotes} out of {totalVotes} votes
                </div>
                <br />
                <hr />
                <br />
                <div>
                    {userVote === 'optionTwo' && <YourChoice />}

                    <h3 style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</h3>
                    <ProgressBar variant="info" now={100 - ((optionOneVotes / totalVotes) * 100).toFixed(2)} label={`${100 - ((optionOneVotes / totalVotes) * 100).toFixed(2)}%`} />
                    {optionTwoVotes} out of {totalVotes} votes
                </div>
                <hr />
                <Button variant="outline-secondary" onClick={this.handleClick}>Back</Button>{' '}

            </div>
        );
    }
}

function mapStateToProps({ users, authedUser }) {
    const user = users[authedUser];
    return {
        user
    };
}

export default withRouter(connect(mapStateToProps)(PollResult));