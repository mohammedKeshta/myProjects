import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Segment, Progress, Button, Icon } from 'semantic-ui-react'
import YourChoice from './YourChoice'

class PollResult extends Component {

    handleClick = () => {
        this.props.history.push('/') // returns you to the previous route after updating it
    };

    render() {

        const { question, user } = this.props
        // to get the number of votes of the 1st selection
        const optionOneVotes = question.optionOne.votes.length
        // to get the number of votes of the 2nd selection
        const optionTwoVotes = question.optionTwo.votes.length
        // the total of the votes for the whole question whether it is option one or option two
        const totalVotes = optionOneVotes + optionTwoVotes

        const userVote = user.answers[question.id]

        return (
            <Fragment>
                <Header as="h3">
                    Results:
                    <Header.Subheader style={{ fontWeight: 'bold' }}>
                        Would you rather
                    </Header.Subheader>
                </Header>
                <Segment>
                    {userVote === 'optionOne' && <YourChoice />} {/* to mark option one if it is your selected answer*/}
                    <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
                    <Progress
                        //setting the progress bar percentage value
                        percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
                        progress
                        // setting the color of the option with the more votes to blue 
                        color={(optionOneVotes > optionTwoVotes) ? 'green' : 'red'}
                    >
                        {optionOneVotes} out of {totalVotes} votes {/*showing the 1st option votes in combaring with total votes */}
                    </Progress>
                </Segment>
                <Segment>
                    {userVote === 'optionTwo' && <YourChoice />} {/* to mark option two if it is your selected answer*/}

                    <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
                    <Progress
                        percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
                        progress
                        color={(optionOneVotes > optionTwoVotes) ? 'red' : 'green'}
                    >
                        {optionTwoVotes} out of {totalVotes} votes
                    </Progress>
                </Segment>
                <Button color='black' icon labelPosition='left' size="small" floated="right" onClick={this.handleClick}>
                    Back
                    <Icon name='left arrow' />
                </Button>
            </Fragment>
        );
    }
}

function mapStateToProps({ users, authedUser }) {
    const user = users[authedUser]

    return {
        user
    };
}

export default withRouter(connect(mapStateToProps)(PollResult));