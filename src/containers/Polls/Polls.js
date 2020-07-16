import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as pollActions from '../../store/actions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import PollList from '../../components/PollList/PollList';
import Poll from '../../components/Poll/Poll';
import classes from './Polls.css';
import axios from '../../axios-polls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Polls extends Component {
    state = {
        answers: null,
        showPoll: false,
        submitting: null
    }

    componentDidMount () {
        this.props.onInitPolls();
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    selectPollHandler = ( id ) => {
        setTimeout( () => {
            this.setState(( prevState, props ) => {
                return {
                    ...prevState,
                    showPoll: true
                }
            })
        }, 100);
        let props = {...this.props.pollId};
        props.pollId = id;
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

    reloadPage = () => {
        window.location.reload()
    }

    answerHandler = event => {
        event.preventDefault();

        const answer = this.state.answers;

        this.props.onAnsweringPoll(this.props.pollId, answer, this.toHomeHandler, this.reloadPage);
    }

    onChangeHandler = ( event, inputIdentifier ) => {
        const updatedAnswerForm = {
            ...this.state.answers
        }

        const updatedFormElement = {
            ...updatedAnswerForm[inputIdentifier]
        }

        updatedFormElement.answer = event.target.value;
        updatedAnswerForm[inputIdentifier] = updatedFormElement;

        setTimeout( () => {
            this.setState({
                answers: updatedAnswerForm
            })
        }, 200)
    }

    render() {
        let list = this.props.error ? <p>No se pudo cargar las encuestas!</p> :
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
                    pollId={this.props.pollId}
                    questions={this.props.polls[this.props.pollId]}
                    changed={this.onChangeHandler}
                    clicked={this.answerHandler} />
            )
        }

        if (this.props.answering) {
            answerPoll = <Spinner />
        }

        return (
            <div className={classes.Polls}>
                <Aux>
                    {list}
                    {answerPoll}
                </Aux>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.polls.error,
        polls: state.polls.polls,
        pollId: state.polls.pollId,
        loading: state.polls.loading,
        answering: state.polls.answering,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPolls: () => dispatch(pollActions.initPolls()),
        onAnsweringPoll: (pollId, answerData, OnConfirm, OnError) => dispatch(pollActions.addAnswer(pollId, answerData, OnConfirm, OnError))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Polls, axios ));