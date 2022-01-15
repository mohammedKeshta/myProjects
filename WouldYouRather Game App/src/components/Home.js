import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import UserInfo from './UserInfo'

class Home extends Component {

  render() {
    const { userQuestionInfo } = this.props;

    return <Tab panes={tabPanes({ userQuestionInfo })} className="tab" />;
  }
}
// conditions for showing which questions are answered and which are't in different Tabs
function tabPanes(props) {
  const { userQuestionInfo } = props;
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {userQuestionInfo.answered.map(question => (
            <UserInfo
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {userQuestionInfo.unanswered.map(question => (
            <UserInfo
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      )
    }
  ];
};

function mapStateToProps({ authedUser, users, questions }) {
  //using Object.key to get the Ids of the answers from users object
  const answeredIds = Object.keys(users[authedUser].answers)
  //using Object.values to get the answered questions from questions object
  const answered = Object.values(questions).filter(question => !answeredIds.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp)
  //using Object.values to get the unanswered questions from questions object
  const unanswered = Object.values(questions).filter(question => answeredIds.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp)

  return {
    userQuestionInfo: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Home);