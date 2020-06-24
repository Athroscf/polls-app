import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import PollList from '../../components/PollList/PollList';
import Poll from '../../components/Poll/Poll';
import classes from './Polls.css';
import axios from '../../axios-polls';

export class Polls extends Component {
    state = {
        showPoll: false
    }

    componentDidMount () {
        axios.get('/listPolls')
            .then(res => {
                this.setState({
                    polls: res.data.result
                });
            });
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    selectPollHandler = () => {
        this.setState({
            showPoll: true
        })
    }

    render() {
        let answerPoll = null;

        if (this.state.showPoll) {
            answerPoll = (
                <Poll
                    questions={this.state.polls} />
            )
        }

        return (
            <div className={classes.Polls}>
                <Aux>
                    <PollList
                        pollSelected={this.selectPollHandler}
                        clicked={this.goBackHandler} />
                    {answerPoll}
                </Aux>
            </div>
        )
    }
}

export default Polls;
