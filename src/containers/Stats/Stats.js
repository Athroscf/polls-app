import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import * as pollActions from '../../store/actions';
import axios from '../../axios-polls';
import Chart from '../../components/Chart/Chart';
import classes from './Stats.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import { ObjectIding } from '../../shared/utility';

const stats = props => {
    const { onInitPolls, results, loading } = props;

    useEffect(() => {
        onInitPolls();
        document.title = 'Estadísticas'
    }, []);

    const toHome = () => {
        props.history.push('/');
    }

    let stats = props.error ? null :
                              <Spinner />;

    if (!loading && results) {
        stats = <div>
                    <Typography variant="h3" className={classes.Typography}>
                        Encuesta: {results.pollName}
                    </Typography>
                    {ObjectIding(props.polls[props.pollId].questions)
                        .map(question => (
                            <div key={question.id} className={classes.Chart}>
                                <Chart
                                    title={question.question}
                                    labels={question.options}
                                    data={results[question.id]}
                                    key={question.id} />
                            </div>
                        ))}
                    <Button
                        className={classes.Button}
                        click={toHome} >
                            Ir a Inicio
                    </Button>
                </div>
    };

    return (
        <div className={classes.Charts}>
            {stats}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        error: state.polls.error,
        pollId: state.polls.pollId,
        polls: state.polls.polls,
        results: state.polls.results,
        loading: state.polls.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPolls: () => dispatch(pollActions.initPolls())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( stats, axios );
