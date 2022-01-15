import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Header, Button, Form, Radio } from 'semantic-ui-react'
//import { Button, Form } from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
import { handleSaveQuestionAnswer } from '../actions/users'

class PollQuestion extends Component {

    state = {
        value: '',
    };

    handleChange = (e, { value }) =>
        this.setState({ value });

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.value !== '') {
            const { authedUser, question, handleSaveQuestionAnswer } = this.props;
            console.log(this.state.value) // testing
            console.log(authedUser) //testing
            console.log(question.id) //testing
            console.log(this.props)
            handleSaveQuestionAnswer(authedUser, question.id, this.state.value);
            //setting the value again with ''
            console.log(this.state.value) // testing
            console.log(authedUser) //testing
            console.log(question.id) //testing
            console.log(this.props)
        }
    };
    render() {
        const { question } = this.props;
        const disabled = this.state.value === '' ? true : false;
        return (
            <Fragment>
                <h4>Would you rather</h4>
               
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Radio
                            label={question.optionOne.text}
                            name="radioGroup"
                            value='optionOne'
                            checked={this.state.value === 'optionOne'}
                            onChange={this.handleChange}
                        />
                        <br />
                        <Radio
                            label={question.optionTwo.text}
                            name="radioGroup"
                            value='optionTwo'
                            checked={this.state.value === 'optionTwo'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            color="green"
                            size="small"
                            fluid
                            positive
                            disabled={disabled}
                            content="Submit"
                        />
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser }) {
    // const { question_id } = match.params;
    // const question = questions[question_id];

    return {
        authedUser
    };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(PollQuestion);