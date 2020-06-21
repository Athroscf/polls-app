import React from 'react';
import { Button } from '@material-ui/core';

import classes from './LoginButton.css';

const loginButton = ( props ) => {
    return (
        <div>
            <Button className={classes.Button}>
                {props.content}
            </Button>
        </div>
    )
}

export default loginButton
