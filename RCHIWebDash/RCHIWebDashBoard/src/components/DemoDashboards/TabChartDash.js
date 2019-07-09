import React, { Component } from 'react';
import TabChartChooser from '../charts/TabChartChooser';

export default class TabChartDash extends Component {
    constructor(props){
        super(props);

    }
    
    state = {
        datasets: [
            [
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            backgroundColor: '#bc509040',
                            borderColor: '#bc5090'
                        },
                        {
                            label: 'VolunteerCount',
                            data: [1578,1272,1165,1406,1710],
                            backgroundColor: '#003f5cFF',
                            borderColor: '#003f5c'
                        }
                    ]
                },
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [ '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#ff6361',
                                '#ffa600' ],
                        }
                    ]
                },
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [   '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#ff6361',
                                '#ffa600' ],
                        }
                    ]
                },
            ],  
            [
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            backgroundColor: '#003f5c40',
                            borderColor: '#003f5c'
                        }
                    ]
                },
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [5234,3372,2165,2406,2310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [ '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#ff6361',
                                '#ffa600' ],
                        },
                        {
                            label: 'Homeless Count 2',
                            data: [2978,2372,4165,2706,3310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [   '#ffa600' ,
                                '#ff6361',
                                '#bc5090',
                                '#58508d',
                                '#003f5c',
                                ],
                        }
                    ]
                },
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [   '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#ff6361',
                                '#ffa600' ],
                        }
                    ]
                },
            ],
            [ // Third data sets
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            backgroundColor: '#bc509040',
                            borderColor: '#bc5090'
                        },
                        {
                            label: 'VolunteerCount',
                            data: [1578,1272,1165,1406,1710],
                            backgroundColor: '#003f5cFF',
                            borderColor: '#003f5c'
                        }
                    ]
                },
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [15234,22372,2165,2406,2310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [ '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#ff6361',
                                '#ffa600' ],
                        }
                    ]
                },
                {
                    labels: ['2013','2015','2016','2017','2018'],
                    datasets:[
                        {
                            label: 'Homeless Count',
                            data: [2978,2372,2165,2406,2310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [   '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#ff6361',
                                '#ffa600' ],
                        },
                        {
                            label: 'Homeless Count 2',
                            data: [2978,2372,4165,2706,3310],
                            borderColor: '#FFF',
                            backgroundColor: 
                            [   '#ffa600' ,
                                '#ff6361',
                                '#bc5090',
                                '#58508d',
                                '#003f5c',
                                ],
                        }
                    ]
                },
            ],
        ],
    }

    render(){
        return(
            <div id="Report1" className="container-fluid">
                <h1>Tab Chart Demo</h1>
                <p>
                    Click on the boxes at the top of each chart to hide that data
                <br/>
                    Click on the tabs on the bottom to switch chart type
                <br/>
                    Click on the chart to hide tabs
                </p>
                <div className="row">
                    <div className="col-sm-4">
                        <TabChartChooser
                            rowIDX = {0}
                            passdIDX= {1}
                            data={ 0}
                            datasets={this.state.datasets}
                            title={"PIT Count through the Years"} 
                            type={""}
                            defaultChart={3}
                        />
                    </div>
                    <div className="col-sm-4">
                        <TabChartChooser
                            rowIDX = {0}
                            passdIDX= {1}
                            data={ 1}
                            datasets={this.state.datasets}
                            title={"PIT Count through the Years"} 
                            type={""}
                            defaultChart={1}
                        />
                    </div>
                    <div className="col-sm-4">
                        <TabChartChooser
                            rowIDX = {0}
                            passdIDX= {1}
                            data={ 2}
                            datasets={this.state.datasets}
                            title={"PIT Count through the Years"} 
                            type={""}
                            defaultChart={2}
                        />  
                    </div>
                </div>
            </div>  
        );
    }
}