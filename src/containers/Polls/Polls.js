import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import PollList from '../../components/PollList/PollList';
import Poll from '../../components/Poll/Poll';
import classes from './Polls.css';

export class Polls extends Component {
    state = {
        showPoll: false
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let answerPoll = null;

        if (this.state.showPoll) {
            answerPoll = (
                <Poll />
            )
        }

        return (
            <div className={classes.Polls}>
                <Aux>
                    <PollList clicked={this.goBackHandler}/>
                    {answerPoll}
                </Aux>
            </div>
        )
    }
}

export default Polls;
