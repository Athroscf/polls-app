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
        answers: {
            0: {
                answer: null
            },
            1: {
                answer: null
            },
            2: {
                answer: null
            },
            3: {
                answer: null
            },
            4: {
                answer: null
            }
        },
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
            let props = {...this.props.pollId};
            props.pollId = id;
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

        const answer = this.state.answers;

        console.log('[answerHandler]', answer);

        this.props.onAnsweringPoll(this.props.pollId, answer);
        this.toStatsHandler();
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
                    pollId={this.props.pollId}
                    questions={this.props.polls[this.props.pollId]}
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
        polls: state.polls,
        pollId: state.pollId,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPolls: () => dispatch(pollActions.initPolls()),
        onAnsweringPoll: (pollId, answerData) => dispatch(pollActions.addAnswer(pollId, answerData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Polls, axios ));