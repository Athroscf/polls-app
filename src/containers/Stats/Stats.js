import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as pollActions from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-polls';
import Chart from '../../components/Chart/Chart';

export class Stats extends Component {
    componentDidMount () {
        this.props.onInitResults()
    }

    render() {
        return (
            <div>
                <Chart />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        polls: state.polls,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitResults: () => dispatch(pollActions.initResults()),
        onAnsweringPoll: (pollId, answerData) => dispatch(pollActions.addAnswer(pollId, answerData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Stats, axios ));
