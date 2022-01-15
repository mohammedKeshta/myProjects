import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'

class PollDetails extends Component {
    
    state = {
        viewPoll: false
    }
 
    handleClick = (e) => {
        this.setState(prevState => ({
            viewPoll: !prevState.viewPoll
        }));
    }

    render() {
        const { question, unanswered } = this.props
        // changing the button color according to the state og question (answered or unanswered)
        const buttonColor = unanswered === true ? 'red' : 'blue'
        // changing the button text according to the state og question (answered or unanswered)
        const buttonContent = unanswered === true ? 'Answer Poll...' : 'Results'
        // to redirect the user to the result of the current question
        if (this.state.viewPoll === true) {
            return <Redirect push to={`/questions/${question.id}`} />
        }

        return (
            <Fragment>
                <Header as="h5" textAlign="left">
                    Would you rather
                </Header>
                <p style={{ textAlign: 'center' }}>
                    {question.optionOne.text}
                    <br />
                    or...
                </p>
                <Button
                    color={buttonColor}
                    size="small"
                    fluid
                    onClick={this.handleClick}
                    content={buttonContent}
                />
            </Fragment>
        );
    }
}

export default PollDetails