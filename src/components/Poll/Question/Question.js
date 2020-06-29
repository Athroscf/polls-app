import React from 'react';

import Label from '@material-ui/core/InputLabel';
import Options from './Options/Options';

const question = ( props ) => {
    return (
        <div>
            {props.questions.map( question => (
                <div>
                    {console.log('[QUESTION]', question)}
                    <Label>{ question.question }</Label>
                    <Options
                            options={question.options} />
                </div>
            ))}
        </div>
    )
}

export default question
