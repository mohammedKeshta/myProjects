import React from 'react'
import { Grid, Loader, Dimmer } from 'semantic-ui-react';

function LoginGridLayout({ form, loading }) {
    return (
        <div>
            <Grid padded textAlign="center">
                <Grid.Row className="login">
                    <Grid.Column width={16}>
                        {loading === true && (
                            <Dimmer active inverted>
                                <Loader inverted content="Loading" />
                            </Dimmer>
                        )}
                        <br />
                        {form}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default LoginGridLayout
