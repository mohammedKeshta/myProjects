import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserInfo from './UserInfo2'

class Home extends Component {

    render() {
        const { userQuestionInfo } = this.props;

        return (
            <Tabs defaultActiveKey="unanswered" id="home-tabs" className="mb-3">
                <Tab eventKey="unanswered" title="Unanswered Polls">
                    {userQuestionInfo.answered.map(question => (
                        <UserInfo
                            key={question.id}
                            question_id={question.id}
                            unanswered={true}
                        />
                    ))}
                </Tab>
                <Tab eventKey="answered" title="Answered Polls">
                    {userQuestionInfo.unanswered.map(question => (
                        <UserInfo
                            key={question.id}
                            question_id={question.id}
                            unanswered={false}
                        />
                    ))}
                </Tab>
            </Tabs>
        )
    }
};

function mapStateToProps({ authedUser, users, questions }) {

    const answeredIds = Object.keys(users[authedUser].answers)

    const answered = Object.values(questions).filter(question => !answeredIds.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp)

    const unanswered = Object.values(questions).filter(question => answeredIds.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp)

    return {
        userQuestionInfo: {
            answered,
            unanswered
        }
    };
}

export default connect(mapStateToProps)(Home);