
import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <Image src="PageNotFound.JPG" size="small" centered />
                <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Match 404 Error</h1>
            </div>
        );
    }
}

export default PageNotFound;