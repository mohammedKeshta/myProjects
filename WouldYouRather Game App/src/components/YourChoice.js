import React from 'react'
import { Label, Icon } from 'semantic-ui-react'

// this function is to mark the choice you selected with a ribbon
function YourChoice() {
    return (
        <div>
            <Label color="orange" ribbon="right" className="vote">
                <Icon name="check circle outline" size="big" className="compact" />
                <div style={{ float: 'right' }}>
                    Your
                    <br />
                    Choice
                </div>
            </Label>
        </div>
    )
}

export default YourChoice
