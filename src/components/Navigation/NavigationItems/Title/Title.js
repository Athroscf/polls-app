import React from 'react';
import { Typography } from '@material-ui/core';

const title = ( props ) => {
    return (
        <div>
            <Typography variant="h6">
                {props.content}
            </Typography>
        </div>
    )
}

export default title
