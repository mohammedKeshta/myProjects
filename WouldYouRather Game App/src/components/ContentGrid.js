import React from 'react' // React default
import { Grid } from 'semantic-ui-react'

export default function ContentGrid({ children }) {
    return (
        <div>
            <Grid padded="vertically" columns={1} centered>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
