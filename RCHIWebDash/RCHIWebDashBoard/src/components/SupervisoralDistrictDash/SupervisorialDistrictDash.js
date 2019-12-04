import React, { Component } from 'react';
import SupervisorialDistrictsHeader from './SupervisorialDistrictsHeader'
import DistrictPopTable from './DistrictPopTable'
import DoughnutChart from '../charts/DoughnutChart'
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import { Row, Col } from 'antd';

import '../css/GeneralDash.css'

import { Grid } from 'semantic-ui-react';

export default class SupervisorialDistrictDash extends Component {
	constructor(props){
        super(props);
        this.state = {
            curDistrict: this.props.District_Num,
            ChronicChartData: [
                {
                    labels: ['Chronic','Not Chronic'],
                    datasets:[
                        {
                            label: 'Chronically Homeless',
                            data: [ 0, 0 ],
                            backgroundColor: ['#cc4f5d80', '#4F9BCC80'],
                            borderColor: '#FFFFFF',
                        },
                    ]
                }
            ],
            PITTrendChartData: [
                {
                    labels: ['2015','2016','2017','2018','2019'],
                    datasets:[
                        {
                            data: [ 0,0,0,0,0 ],
                            backgroundColor: ['#4F9BCC40'],
                            borderColor: '#4F9BCCa0',
                        },
                    ]
                }
            ],
            RaceChartData: [
                {
                    labels: ['Asian','American Indian','Black','White','Multiple','Native Hawaiian','Unknown Race'],
                    datasets:[
                        {
                            data: [ 0,0,0,0,0,0,0 ],
                            backgroundColor: [
                                '#CC804F80',
                                '#4f9bcc80',
                                '#4f5ccc80',
                                '#cc4f5d80',
                                '#804fcc80',
                                '#bf4fcc80',
                                '#cc4f9b80'],
                            borderColor: [
                                '#CC804F',
                                '#4f9bcc',
                                '#4f5ccc',
                                '#cc4f5d',
                                '#804fcc',
                                '#bf4fcc',
                                '#cc4f9b'],
                        },
                    ]
                }
            ],
        };
        this.updateChart = this.updateChart.bind(this);

    }
    updateChart(){
        console.log( this.props.data2019['Chronic'] + " " + this.state.ChronicChartData[0].datasets[0].data[0]);
        
            this.setState({
                curDistrict: this.props.District_Num,
                ChronicChartData: [
                    {
                        labels: ['Chronic','Not Chronic'],
                        datasets:[
                            {
                                label: 'Chronically Homeless',
                                data: [ parseInt(this.props.data2019['Chronic']), parseInt(this.props.data2019['Not Chronic']) ],
                                backgroundColor: ['#804fcc80', '#4F9BCC80'],
                                borderColor: '#FFFFFF',
                            },
                        ]
                    }
                ],
                PITTrendChartData: [
                    {
                        labels: ['2015','2016','2017','2018','2019'],
                        datasets:[
                            {
                                data: [ 
                                    parseInt(this.props.PIT_Count_Trends['2015']), 
                                    parseInt(this.props.PIT_Count_Trends['2016']), 
                                    parseInt(this.props.PIT_Count_Trends['2017']), 
                                    parseInt(this.props.PIT_Count_Trends['2018']), 
                                    parseInt(this.props.PIT_Count_Trends['2019']), 
                                ],
                                backgroundColor: ['#4F9BCC40'],
                                borderColor: '#4F9BCCa0',
                            },
                        ]
                    }
                ],
                RaceChartData: [
                    {
                        labels: ['Asian','American Indian','Black','White','Multiple','Native Hawaiian','Unknown Race'],
                        datasets:[
                            {
                                data: [ 
                                    parseInt(this.props.data2019['Asian']),
                                    parseInt(this.props.data2019['American Indian']), 
                                    parseInt(this.props.data2019['Black']), 
                                    parseInt(this.props.data2019['White']), 
                                    parseInt(this.props.data2019['Multiple']), 
                                    parseInt(this.props.data2019['Native Hawaiian']), 
                                    parseInt(this.props.data2019['Unknown Race']), 
                                ],
                                backgroundColor: [
                                    '#CC804F80',
                                    '#4f9bcc80',
                                    '#4f5ccc80',
                                    '#804fcc80',
                                    '#bf4fcc80',
                                    '#cc4f9b80',
                                    '#cc4f5d80'],
                                borderColor: [
                                    '#CC804F',
                                    '#4f9bcc',
                                    '#4f5ccc',
                                    '#804fcc',
                                    '#bf4fcc',
                                    '#cc4f9b',
                                    '#cc4f5d'],
                            },
                        ]
                    }
                ],
            });
        
    }
	render() {
        //Calculates maxBarChart value by rounding to the nearest 50 and the adding 100 or 50 depending on the round
        var maxBarChart = this.props.data2019['White'] / 50.0;
        if ( maxBarChart%1 < .5){   
            maxBarChart = Math.round(maxBarChart + 2) *50;  }
        else{
            maxBarChart = Math.round(maxBarChart + 1) * 50; }
        
        // Updates Chart Data is props are out of sync with state
        if (this.props.data2019['Chronic'] != this.state.ChronicChartData[0].datasets[0].data[0]){
            this.updateChart(); }
        
        //sets riverside asterisk
        var asterisk;
        if (parseInt(this.props.District_Num) < 3){   
            // asterisk = (<tr><td>* Riverside is part of both District 1 and 2</td> </tr>) ; } 
            asterisk = (<p className="asterisk">* Riverside is part of both District 1 and 2</p>) ; } 

        return(
            <Grid container>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Row type="flex" justify="center" align="top">
                            <Col>
                                <p><SupervisorialDistrictsHeader/> </p>
                            </Col>
                        </Row>
                        <br />
                        <Grid.Row>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <h6>PIT Count Trend</h6>
                                        {/* 
                                            key={Math.random()} this ensures the chart actaully rerenders ebery time the function render is run, otherwise the tables update but not the charts
                                            height={(window.innerHeight*.43)-130} height is scaled based off height of the total window, not sure if this is workable on smaller displays
                                            datasets={this.state.PITTrendChartData} passes in data that in in an array eg. [ {data} ] (built in so its possible to switch datasets from user input)
                                            data={0} selects the dataset from datasets array (built in so its possible to switch datasets from user input)
                                            showAllTooltips={true} displays all tooltips (the small things that display catergories and numbers)
                                        */}
                                        <LineChart key={Math.random()} height={(window.innerHeight*.43)-130} datasets={this.state.PITTrendChartData} data={0} showAllTooltips={true}/>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <h6>Chronically Homeless</h6>
                                        {/* 
                                            same as linechart
                                        */}
                                        <DoughnutChart key={Math.random()} height={(window.innerHeight*.43)-130} datasets={this.state.ChronicChartData} data={0} showAllTooltips={true}/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h6>Population Counts</h6>
                        {/* 
                            passes in data straight from props
                        */}
                        <DistrictPopTable data2018={this.props.data2018} data2019={this.props.data2019} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <h6>PIT Count By City</h6>
                        <table className="width100 bottomTables">
                            {/* Creates Header */}
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>2018</th>
                                    <th>2019</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    /* Maps each of the citys in the array passed in to a row in the table, alternating shaded or not */
                                    this.props.City_Counts.map( (city, idx) => {
                                        if (idx%2 == 0)
                                            return(
                                                <tr className="shaded">
                                                    <th>{city['City']}</th>
                                                    <td>{city['2018']}</td>
                                                    <td>{city['2019']}</td>
                                                </tr>
                                            );
                                        else
                                            return(
                                                <tr>
                                                    <th>{city['City']}</th>
                                                    <td>{city['2018']}</td>
                                                    <td>{city['2019']}</td>
                                                </tr>
                                            );  
                                    })
                                }
                            </tbody>
                            {/* riverside asterisk */}
                            
                        </table>
                        { asterisk } 
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h6>Race</h6>
                        {/* 
                            key={Math.random()} this ensures the chart actaully rerenders ebery time the function render is run, otherwise the tables update but not the charts
                            height={(window.innerHeight*.43)-130} height is scaled based off height of the total window, not sure if this is workable on smaller displays
                            datasets={this.state.PITTrendChartData} passes in data that in in an array eg. [ {data} ] (built in so its possible to switch datasets from user input)
                            data={0} selects the dataset from datasets array (built in so its possible to switch datasets from user input)
                            maxYaxis={maxBarChart} increases max value on y axis to fit numbers on top of the bars
                        */}
                        <BarChart key={Math.random()} height={window.innerHeight*.35} datasets={this.state.RaceChartData} data={0} maxYaxis={maxBarChart}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h6>Household Composition</h6>
                        <table className="width100 bottomTables">
                            {/* 
                                passes in data straight from props
                            */}
                            <thead>
                                <tr>
                                    <th colspan="2">Interview Only</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Total Households Interviewed</th>
                                    <td>{this.props.data2019['Households Interviewed']}</td>
                                </tr>
                                <tr className="shaded">
                                    <th>Only Adults Households</th>
                                    <td>{this.props.data2019['Only Adults']}</td>
                                </tr>
                                <tr>
                                    <th>Adults and Children</th>
                                    <td>{this.props.data2019['Adults and Children']}</td>
                                </tr>
                                <tr className="shaded">
                                    <th>Children Only Households</th>
                                    <td>{this.props.data2019['Only Children']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Grid.Column>
                </Grid.Row>
                
            </Grid>
        );
    }
}