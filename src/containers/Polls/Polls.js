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

export class Polls extends Component {
    state = {
        answers: {},
        showPoll: false,
        submitting: null,
        pollId: null
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
                    pollId: id,
                    showPoll: true
                }
            })
        }, 100);
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

    answerHandler = event => {
        event.preventDefault();

        const answer = this.state.answer;

        console.log('[answerHandler]', answer);

        this.props.onAnsweringPoll(answer);
    }

    onChangeHandler = ( event, inputIdentifier ) => {
        const updatedForm = {
            ...this.state.answer
        }

        updatedForm[inputIdentifier] = event.target.value;

        this.setState({
            answer: updatedForm
        })
        console.log('[onChangeHandler]', this.state);
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

        if (this.state.showPoll && this.state.pollId) {
            answerPoll = (
                <Poll
                    questions={this.props.polls[this.state.pollId]}
                    changed={this.onChangeHandler}
                    clicked={this.answerHandler} />
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
        onInitPolls: () => dispatch(pollActions.initPolls()),
        onAnsweringPoll: (answerData) => dispatch(pollActions.addAnswer(answerData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Polls, axios ));