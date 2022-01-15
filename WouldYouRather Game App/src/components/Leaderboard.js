import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
//import { Segment, Grid, Header, Image, Label, Divider } from 'react-bootstrap'
import { Segment, Grid, Header, Image, Label, Divider } from 'semantic-ui-react'

// for marking the users through order the cup colors (gold/silver/bronze)
const trophyColor = ['yellow', 'grey', 'orange']

class Leaderboard extends Component {

    render() {
        const { usersData } = this.props; //destructuring
        //showing the data of each user (answered/created questions count)
        return (
            <Fragment>
                {usersData.map((user, order) => (
                    <Segment.Group key={user.id}>
                        <Label corner="right" icon="trophy" color={trophyColor[order]} />
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign="middle">
                                    <Image src={user.avatarURL} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as="h3" textAlign="left">
                                        {user.name}
                                    </Header>
                                    <Grid>
                                        <Grid.Column width={12}>Answered questions</Grid.Column>
                                        <Grid.Column width={4}>{user.answersCount}</Grid.Column>
                                    </Grid>
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={12}>Created questions</Grid.Column>
                                        <Grid.Column width={4}>{user.questionsCount}</Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign="center">
                                    <Segment.Group>
                                        <Header as="h5" block attached="top" content="Score" />
                                        <Segment>
                                            <Label circular color="green" size="big">
                                                {user.questionsCount + user.answersCount}
                                            </Label>
                                        </Segment>
                                    </Segment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>
                ))}
            </Fragment>
        );
    }
}


function mapStateToProps({ users }) {
    const usersData = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answersCount: Object.values(user.answers).length,
            questionsCount: user.questions.length,
            userTotalQuestions: Object.values(user.answers).length + user.questions.length
        }))
        .sort((a, b) => a.userTotalQuestions - b.userTotalQuestions)
        .reverse()
        .slice(0, 3);

    return {
        usersData
    };
}

export default connect(mapStateToProps)(Leaderboard);