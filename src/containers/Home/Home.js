import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import classes from './Home.css';

export class Home extends Component {
    render() {
        return (
            <Aux>
                <div className={classes.Home}>
                    <h1>Responde nuestra encuesta</h1>
                    <Button content="Responder Encuesta"/>
                    {/* <Button content=/> */}
                </div>
            </Aux>
        )
    }
}

export default Home;
