import React from 'react';
import { Bar } from 'react-chartjs-2';

const barChart = ( props ) => {
    return (
        <div>
            <Bar
                data={{
                    labels: [props.labels],
                    datasets: [{
                        barPercentage: 0.5,
                        data: [ props.data ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        fontSize: 25,
                        text: props.title
                    },
                    legend: false,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                text: 'Numero de personas'
                            },
                            ticks: {
                                beginAtZero: true,
                                callback: function(value) {if (value % 1 === 0) { return value; }}
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    responsive: true
                }}
            />
        </div>
    )
}

export default barChart;
