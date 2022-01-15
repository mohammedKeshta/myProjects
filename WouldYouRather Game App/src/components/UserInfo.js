import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Segment, Header, Grid, Image } from 'semantic-ui-react'
import PollQuestion from './PollQuestion'
import PollResult from './PollResult'
import PollDetails from './PollDetails'

const pollTypes = {
    POLL_Details: 'POLL_Details',
    POLL_QUESTION: 'POLL_QUESTION',
    POLL_RESULT: 'POLL_RESULT'
};

const PollContent = props => {
    const { pollType, question, unanswered } = props;

    switch (pollType) {
        case pollTypes.POLL_Details:
            return <PollDetails question={question} unanswered={unanswered} /> // to show the details of the poll
        case pollTypes.POLL_QUESTION:
            return <PollQuestion question={question} /> // to show the question and the option of it
        case pollTypes.POLL_RESULT:
            return <PollResult question={question} /> // to show the result of a question after submitting the answer
        default:
            return;
    }
};

class UserInfo extends Component {

    render() {
        const { author, question, pollType, badPath, unanswered = null } = this.props;

        if (badPath === true) {
            //if bad path is entered it will give a 404 error, which will appear after the re-login
            return <Redirect to="/questions/unauthorized_user" />
        }

        const tabColor = unanswered === true ? 'red' : 'blue';
        const borderTop =
            unanswered === null
                ? '1px solid grey'
                : `2px solid ${tabColor}`;

        return (
            <Segment.Group>
                <Header
                    as="h5"
                    textAlign="left"
                    block
                    attached="top"
                    style={{ borderTop: borderTop }}
                >
                    {author.name} asks:
                </Header>

                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={author.avatarURL} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <PollContent
                                pollType={pollType}
                                question={question}
                                unanswered={unanswered}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }, { match, question_id }) {
    let question,
        author,
        pollType,
        badPath = false
    //if the question id exists, it will give its details
    if (question_id !== undefined) {
        question = questions[question_id]
        author = users[question.author]
        pollType = pollTypes.POLL_Details
    } else {
        const { question_id } = match.params

        question = questions[question_id]

        const user = users[authedUser]
        //if question is undefined the user will be directed to 404 page
        if (question === undefined) {
            badPath = true
        } else {
            author = users[question.author]
            pollType = pollTypes.POLL_QUESTION
            //if question exists the user will be taken to the result of this question
            if (Object.keys(user.answers).includes(question.id)) {
                pollType = pollTypes.POLL_RESULT
            }

        }
    }

    return {
        badPath,
        question,
        author,
        pollType
    };
}

export default connect(mapStateToProps)(UserInfo);