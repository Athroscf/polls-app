import React from 'react';
import { ListItem } from '@material-ui/core';

import classes from './ListItem.css';

const listItem = ( props ) => {
    return (
        <ListItem
            className={classes.ListItem}
            button
            onChange={props.handleChange}
            key={props.id}
            onClick={props.clicked}>
            {props.pollName}
        </ListItem>
    )
}

export default listItem
