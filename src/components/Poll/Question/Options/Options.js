import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

import RadioButton from '../../../UI/RadioButton/RadioButton';
import classes from './Options.css';

const options = ( props ) => {
    return (
        <RadioGroup className={classes.RadioGroup}>
            {props.options.map( option => (
                <div className={classes.RadioButton}>
                    <RadioButton
                    name={option.option}
                    value={option.option}
                    content={option.option}
                    changed={props.changed} />
                </div>
            ))}
        </RadioGroup>
    )
}

export default options;
