import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import PollList from '../../components/PollList/PollList';
import Poll from '../../components/Poll/Poll';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Polls.css';
import axios from '../../axios-polls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as pollActions from '../../store/actions';
import poll from '../../components/Poll/Poll';

export class Polls extends Component {
    state = {
        showPoll: false,
        submitting: null
    }

    componentDidMount () {
        this.props.onInitPolls();
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    selectPollHandler = ( poll ) => {
        this.setState({
            poll: poll,
            showPoll: true
        })
        console.log('[STATE]', this.state.poll);
    }

    submitAnswerHandler = () => {
        this.setState( { submitting: true } );
    }

    submitAnswerFailedHandler = () => {
        this.setState( { submitting: false } );
    }

    toHomeHandler = () => {
        this.props.history.push('/');
    }

    toStatsHandler = () => {
        this.props.history.push('/stats');
    }

    render() {
        let list = this.props.error ? <p>No se pudo cargar las encuestas!</p> :
                                      <Spinner />;

        let submit = this.state.submitting ? <p>No se pudo guardar sus respuestas!</p> :
                                             <Spinner />;

        if ( this.props.polls ) {
            list = (
                <Aux>
                    <PollList
                        pollList={this.props.polls}
                        pollSelected={this.selectPollHandler}
                        clicked={this.goBackHandler} />
                </Aux>
            );

        }

        let answerPoll = null;

        if (this.state.showPoll) {
            answerPoll = (
                <Poll
                    questions={this.state.poll} />
            )
        }

        return (
            <div className={classes.Polls}>
                <Aux>
                    <Modal
                        show={this.state.submitting}
                        modalClosed={this.state.submitting ? this.submitAnswerHandler :
                                                            this.submitAnswerFailedHandler} >
                        {submit}
                    </Modal>
                    {list}
                    {answerPoll}
                </Aux>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        polls: state.polls
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPolls: () => dispatch(pollActions.initPolls())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Polls, axios ));
