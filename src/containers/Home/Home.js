import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import classes from './Home.css';

export class Home extends Component {
    nextPageHandler = ( page ) => {
        this.props.history.push({
            pathname: '/' + page
        })
    }

    render() {
        return (
            <Aux>
                <div className={classes.Home}>
                    {/* <h1>Responde nuestra encuesta</h1> */}
                    <Button
                        click={() => this.nextPageHandler('polls')}>
                            Responder Encuesta
                    </Button>
                    { this.props.isAuth ?
                        <Button
                            click={() => this.nextPageHandler('stats')}>
                                Resultados
                        </Button> : null
                    }
                </div>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Home);