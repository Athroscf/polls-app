import React from 'react';
// import Label from '@material-ui/core/InputLabel';

import Typography from '@material-ui/core/Typography';
import Button from '../UI/Button/Button';
import Questions from './Question/Question';
import classes from './Poll.css';

const Poll = ( props ) => {
    return (
        <div className={classes.Poll}>
            <Typography variant="h5" className={classes.Typography}>
                Encuesta: { props.questions.pollName }
            </Typography>
            <form onSubmit={ props.clicked }>
                <Questions questions={props.questions.questions}/>
                <Button
                    type="submit"
                    content="Responder Encuesta" />
            </form>
        </div>
    )
}

export default Poll;
