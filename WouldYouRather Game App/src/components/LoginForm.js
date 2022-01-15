import React, { Component } from 'react'
import { Header, Form } from 'semantic-ui-react'

class LoginForm extends Component {

    state = {
        value: '' //setting the state as no value at first before selection
    }
    // this action will happen when one of the authed users is selected
    onChange = (e, { value }) => {
        this.setState({ value });
    }
    // to update the state with the current user when the form i submitted
    handleSubmit = e => {
        e.preventDefault();
        const { onLoading, setAuthedUser } = this.props;
        const authedUser = this.state.value;
        new Promise((res, rej) => {
            onLoading();
            setTimeout(() => res(), 500);
        }).then(() => setAuthedUser(authedUser));
    }

    generateDropdownData = () => {
        const { users } = this.props; //filling the drop down list with the authorized user in the DataBase
        //this will return the data required for each user(id, name, avatar)
        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }));
    };
    render() {
        const { value } = this.state;
        const disabled = value === '' ? true : false; // to disable the login button when No user is selscted

        return (
            <Form onSubmit={this.handleSubmit}>
                <Header as="h2" color="blue">
                    Sign In
                </Header>
                <Form.Dropdown
                    placeholder="Select a Friend"
                    fluid
                    selection
                    scrolling
                    options={this.generateDropdownData()}
                    value={value}
                    onChange={this.onChange}
                    required
                />
                <Form.Button content="Login" primary disabled={disabled} fluid />
            </Form>
        );
    }
}

export default LoginForm