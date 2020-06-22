import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import classes from './Home.css';

export class Home extends Component {
    nextPageHandler = () => {
        this.props.history.push({
            pathname: '/polls'
        })
    }

    render() {
        return (
            <Aux>
                <div className={classes.Home}>
                    <h1>Responde nuestra encuesta</h1>
                    <Button
                        content="Responder Encuesta"
                        click={this.nextPageHandler} />
                    {/* <Button content=/> */}
                </div>
            </Aux>
        )
    }
}

export default Home;
