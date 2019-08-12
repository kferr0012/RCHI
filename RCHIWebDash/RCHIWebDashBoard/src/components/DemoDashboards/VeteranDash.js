import React, { Component } from 'react';
import TabChartChooser from '../charts/TabChartChooser';
import '../css/GeneralDash.css';
export default class VeteranDash extends Component {
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
						'#ffa600'
					],
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
							'#ffa600' 
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
							'#ffa600' 
						],
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
	render() {
	    return (
	      <div className="container-fluid gendashbg">
                <div className="row height100">
                    <div className="col-sm-5">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 2}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={2}
                                        width={window.innerWidth*5/12 - 60}
                                        height={window.innerHeight/3}
                                    /> 
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget">
                                    <p>HeatGraph</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget widget-bottom">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 2}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={2}
                                        width={window.innerWidth*5/12 - 60}
                                        height={window.innerHeight/4}
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget widget-right">
                                    <h1>2019 Veterans Dashboard</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="widget height100min15">
                                            <p>Count</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="widget height100min15">
                                            <p>Count</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="widget height100min15">
                                    <h2>Count</h2>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="widget widget-right">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 0}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={3}
                                        width={window.innerWidth*7/12*5/12 -60}
                                        height={window.innerHeight/5}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget widget-right">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 1}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={1}
                                        width={window.innerWidth*7/12-60}
                                        height={window.innerHeight/5}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="widget widget-bottom">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 0}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={3}
                                        width={window.innerWidth*7/12*3/12 -60}
                                        height={window.innerHeight/5}
                                    />
                                </div> 
                            </div>
                            <div className="col-sm-6">
                                <div className="widget widget-bottom">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 0}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={3}
                                        width={window.innerWidth*7/12*6/12 -60}
                                        height={window.innerHeight/5}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="widget widget-bottom widget-right">
                                    <TabChartChooser
                                        rowIDX = {0}
                                        passdIDX= {1}
                                        data={ 0}
                                        datasets={this.state.datasets}
                                        title={"PIT Count through the Years"} 
                                        type={""}
                                        defaultChart={3}
                                        width={window.innerWidth*7/12*3/12 -60}
                                        height={window.innerHeight/5}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	      </div>
	      
	      
	    );
  	}
}