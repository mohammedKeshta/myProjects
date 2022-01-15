import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Image, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import PollQuestion from './PollQuestion2'; //tessssting
import PollResult from './PollResult2'; //tessssting
import PollDetails from './PollDetails';

const pollTypes = {
    POLL_Details: 'POLL_Details',
    POLL_QUESTION: 'POLL_QUESTION',
    POLL_RESULT: 'POLL_RESULT'
};

const PollContent = props => {
    const { pollType, question, unanswered } = props;

    switch (pollType) {
        case pollTypes.POLL_Details:
            return <PollDetails question={question} unanswered={unanswered} />;
        case pollTypes.POLL_QUESTION:
            return <PollQuestion question={question} />;
        case pollTypes.POLL_RESULT:
            return <PollResult question={question} />;
        default:
            return;
    }
};

class UserInfo extends Component {

    render() {
        const { author, question, pollType, badPath, unanswered = null } = this.props;

        if (badPath === true) {
            return <Redirect to="/questions/unauthorized_user" />;
        }

        const tabColor = unanswered === true ? 'green' : 'blue';
        const borderTop =
            unanswered === null
                ? '1px solid grey'
                : `2px solid ${tabColor}`;

        return (
            <div>
                <Card style={{ width: '18rem', height: '30rem' }}>
                    <Image src={author.avatarURL} roundedCircle />
                    <Card.Body>
                        <Card.Title>{author.name} asks:</Card.Title>
                        <Card.Text>
                            <PollContent
                                pollType={pollType}
                                question={question}
                                unanswered={unanswered}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>


            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }, { match, question_id }) {
    let question,
        author,
        pollType,
        badPath = false;
    if (question_id !== undefined) {
        question = questions[question_id];
        author = users[question.author];
        pollType = pollTypes.POLL_Details;
    } else {
        const { question_id } = match.params;
        question = questions[question_id];
        //debugger // testing
        const user = users[authedUser];

        if (question === undefined) {
            badPath = true;
        } else {
            author = users[question.author];
            pollType = pollTypes.POLL_QUESTION;
            if (Object.keys(user.answers).includes(question.id)) { //to look here for an error
                pollType = pollTypes.POLL_RESULT;
            }
            //console.log(Object.keys(user.answers).includes(question.id))// testing
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