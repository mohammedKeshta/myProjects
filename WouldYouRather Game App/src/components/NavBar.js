import React, { Component } from 'react'
import { NavLink } from 'react-router-dom' // to nafigate through the navigation bar to other links
import { connect } from 'react-redux'
import { Menu, Grid, Button, Container, Label, Image} from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        this.props.setAuthedUser(null) // to set the current user with null to prevent unathorized entries
    }
    render() {
        const { authedUser, users } = this.props;

        return (
            <div>
                <Container>
                    <Grid padded="vertically" columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Label image>
                                    <Image src={users[authedUser].avatarURL} />
                                    {users[authedUser].name}
                                </Label>
                                <Button
                                    content="Logout"
                                    labelPosition="right"
                                    basic
                                    compact
                                    icon="log out"
                                    size="mini"
                                    floated="right"
                                    onClick={this.handleLogout}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Menu pointing secondary widths={3}>
                                    <Menu.Item name="home" as={NavLink} to="/" exact />
                                    <Menu.Item name="new poll" as={NavLink} to="/add" />
                                    <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}


function mapStateToProps({ users, authedUser }) {
    return {
        authedUser,
        users
    };
}

export default connect(mapStateToProps, { setAuthedUser })(NavBar);