import React from 'react';
import { List } from '@material-ui/core';

import ListItem from '../UI/ListItem/ListItem';
import Button from '../UI/Button/Button';
import classes from './PollList.css';

const PollList = ( props ) => {
    return (
        <div className={classes.PollList}>
            <h3>Encuestas</h3>
            <List>
                {props.pollList.map(poll => (
                    <div>
                        <ListItem
                            key={ poll._id }
                            clicked={ () => props.pollSelected(poll) }
                            pollName={poll.pollName} />
                    </div>
                ))}
            </List>
            <Button content="Volver" click={props.clicked}/>
        </div>
    )
}

export default PollList;
