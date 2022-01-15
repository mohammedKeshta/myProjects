import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Segment, Header, Grid, Divider, Form, Dimmer, Loader } from 'semantic-ui-react'
import { handleSaveQuestion } from '../actions/questions'

class NewPoll extends Component {
    
    state = {
        validSubmit: false,
        isLoading: false,
        optionOne: '',
        optionTwo: ''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value // to update the state with the chosen value from the given two options
        });
    }
    /*
    after submit the selection, the authed user,and the question id are sent to database
    to alter both users and questions
    */
    handleSubmit = (e) => {
        e.preventDefault();
        const { authedUser, handleSaveQuestion } = this.props;
        const { optionOne, optionTwo } = this.state;

        new Promise((res, rej) => {
            this.setState({ isLoading: true });
            handleSaveQuestion(optionOne, optionTwo, authedUser);
            setTimeout(() => res('success'), 1000);
        }).then(() => {
            this.setState({
                optionOne: '',
                optionTwo: ''
            }); // the state is update to know choice again after submission
            this.setState({ validSubmit: true });
        });
    };
    render() {
        //to disable submit button until one of the options are selected
        const disabled = this.state.optionOne === '' || this.state.optionTwo === '';

        if (this.state.validSubmit === true) {
            return <Redirect to="/" />; // after submission the user is directed to the Home screen
        }
        return (
            < Segment.Group >
                <Header as="h3" textAlign="center" block attached="top">
                    Create a New Poll
                </Header>
                <Grid padded>
                    <Grid.Column>
                        {this.state.isLoading && (
                            <Dimmer active inverted>
                                <Loader content="Updating" />
                            </Dimmer>
                        )}
                        <h4>Give two Options:</h4>
                        <p>
                            <strong>Would you rather...</strong>
                        </p>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                id="optionOne"
                                placeholder="Enter option one..."
                                value={this.state.optionOne}
                                onChange={this.handleChange}
                                required
                            />
                            <Divider horizontal><em>Or</em></Divider>
                            <Form.Input
                                id="optionTwo"
                                placeholder="Enter option two..."
                                value={this.state.optionTwo}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Button primary size="small" fluid disabled={disabled}>
                                Submit Poll
                            </Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment.Group >
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);