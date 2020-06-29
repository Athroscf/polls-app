import React from 'react';

import Label from '@material-ui/core/InputLabel';
import Options from './Options/Options';

const fetchedQuestions = (questions) => {
    const fetchedQuestions = [];
        for ( let key in questions ) {
            fetchedQuestions.push( {
                ...questions[key],
                id: key
            })
        }

    return fetchedQuestions;
}

const question = ( props ) => {
    return (
        <div>
            {fetchedQuestions(props.questions).map( question => (
                <div>
                    <Label key={question.id}>{ question.question }</Label>
                    <Options
                            options={question.options}
                            questionId={question.id}
                            changed={props.changed} />
                </div>
            ))}
        </div>
    )
}

export default question
