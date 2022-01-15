import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Header } from 'semantic-ui-react'
import LoginGridLayout from './LoginGridLayout'
import LoginForm from './LoginForm'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

    state = {
        loading: false
    };
    handleLoading = () => {
        this.setState({ loading: true });
    };

    render() {
        return (
            <Fragment>
                <Segment.Group>
                    <Image src="wouldyourather.png" size="small" centered />
                    <Header textAlign='center'> Welcome to <em>Would You Rather</em> Game </Header>
                    <LoginGridLayout
                        form={<ConnectedLoginForm onLoading={this.handleLoading} />}
                        loading={this.state.loading}
                    />
                </Segment.Group>
            </Fragment>
        );
    }
}
// connecting and dispathcing state { setAuthedUser } to props
const ConnectedLoginForm = connect(mapStateToProps, { setAuthedUser })(LoginForm);

function mapStateToProps({ users }) {
    return {
        users: Object.values(users) // geting the users
    };
}

export default Login;