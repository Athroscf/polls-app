import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import * as pollActions from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-polls';
import Chart from '../../components/Chart/Chart';
import classes from './Stats.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

export class Stats extends Component {
    componentDidMount () {
        this.props.onInitPolls();
        this.setResults(this.props.polls);
        // console.log('[RESULTS', this.props.results);
    }

    // setResults (polls) {
    //     setTimeout(() => {
    //         console.log('[DATA_EXECUTED]');
    //         let data = []
    //         this.fetchedArray(polls[this.props.pollId].answers)
    //             .map(answer => (
    //                 data.push( {
    //                     ...answer
    //                 })
    //             ));
    //         this.props.onSetResults(data);
    //     }, 2000)
    // }

    toHome = () => {
        this.props.history.push('/');
    }

    fetchedArray = ( array ) => {
        const fetchedArray = [];
            for ( let key in array ) {
                fetchedArray.push( {
                    ...array[key],
                    id: key
                })
            }
        return fetchedArray;
    }

    render() {
        let chart = this.props.error ? <p>No se pudo obtener los resultados de la encuesta!</p> :
                                        <Spinner />

        let labels = []
        let typography = null;

        if (!this.props.loading) {
            typography = <Typography variant="h3" className={classes.Typography}>
                             Encuesta: {this.props.polls[this.props.pollId].pollName}
                         </Typography>;

            chart = this.fetchedArray(this.props.polls[this.props.pollId].questions)
                    .map(question => (
                        <div className={classes.Chart}>
                            <div className={classes.HideLabelsArray}>
                                {labels = []}
                                {question.options.map( option => {
                                    return labels.push(option.option)
                                })}
                            </div>
                            <Chart
                                labels={labels}
                                title={question.question}
                                data={[]} />
                        </div>
            ));

            // console.log('[RESULTS', this.props.results);
        }
        // this.state.results[question.id]
        return (
            <div className={classes.Charts}>
                {typography}
                {chart}
                <Button
                    className={classes.Button}
                    content="Ir al Inicio"
                    click={this.toHome} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.polls.error,
        pollId: state.polls.pollId,
        polls: state.polls.polls,
        results: state.polls.results,
        loading: state.polls.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPolls: () => dispatch(pollActions.initPolls())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Stats, axios ));
