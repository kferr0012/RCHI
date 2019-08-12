import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { Grid, Dropdown } from 'semantic-ui-react';

import './CityTables.css'
import { citynames, base, SubPopHeaders, Catergories, Titles } from './constants';

export default class CityDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            curCity: 'RIVERSIDE',
            households: {},
            selectOptions: []
          };
    }

    componentWillMount() {
        this.fetchSubpopulationData();
        this.fetchHouseholdData();
        var options = [];
        for (var i = 0; i < citynames.length; i++)
        {
            options.push({
                value: citynames[i],
                text: citynames[i]
            });
        }
        this.setState({
            selectOptions: options
        })
    }

    async fetchHouseholdData() {
        const promise = await axios.get("http://localhost:8000/api/HouseholdsByCity2019/");
        const indata = promise.status===200 ? promise.data: [];
        if (indata.length === 0){
            throw Error;
        }
        let data = {};
        for (let i = 0; i < citynames.length ; i++)
        {
            data[citynames[i]] = { 
                'Total Households' :0,
                'Adults Only':0,
                'Children Only':0,	
                'Adults and Children':0
            }
        }
        for (let i = 0; i < indata.length ; i++)
        {
            data[indata[i]['city']]['Total Households'] = indata[i]['totalHouseholds'];
            data[indata[i]['city']]['Adults Only'] = indata[i]['adultsOnly'];
            data[indata[i]['city']]['Children Only'] = indata[i]['childrenOnly'];
            data[indata[i]['city']]['Adults and Children'] = indata[i]['adultsAndChildren'];
            
        }
        this.setState({
            households: data
        })
    }

    async fetchSubpopulationData() {
        const promise = await axios.get("http://localhost:8000/api/SubpopulationsByCity2019/");
        const indata = promise.status===200 ? promise.data: [];
        if (indata.length === 0){
            throw Error;
        }
        var data = {};
        for (var i = 0; i < citynames.length ; i++)
        {
            data[citynames[i]] = JSON.parse(JSON.stringify(base));
        }

        for (var i = 0; i < indata.length ; i++)
        {
            data[indata[i]['city']]['District'] = indata[i]['district'];
            data[indata[i]['city']][indata[i]['category']][indata[i]['subpopulation']]['Interview'] = indata[i]['interview'];
            data[indata[i]['city']][indata[i]['category']][indata[i]['subpopulation']]['Observation'] = indata[i]['observation'];
        }
        this.setState({
            data: data
        })
    }

    render(){
        const { data, households, curCity } = this.state;
        return(
            <Grid padded="horizontally" className="dashboard">
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Grid.Row className="widget">
                            <h1>Age</h1>
                            <h1>Age Chart</h1>
                            <h1>Age Table</h1>
                        </Grid.Row>
                        <Grid.Row className="widget">
                            <h1>Subpopulations</h1>
                            <h1>Subpopulations Table</h1>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid.Row className="widget">
                            <h3>2019 Riverside County PIT Count</h3>
                            <h4>{curCity} - District {data[curCity] && data[curCity].District}</h4>
                            <h4>City Level Information</h4>
                        </Grid.Row>
                        <Grid.Row className="widget">
                            <h4>City Totals</h4>
                            <Grid>
                                <Grid.Row columns={3}>
                                    <Grid.Column>
                                        <h5>Chronically Homeless</h5>
                                        <h5>| Some Num |</h5>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <h5>Total Unsheleterd</h5>
                                        <h5>| Some Num |</h5>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <h5>Percent of District</h5>
                                        <h5>| Some Num |</h5>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row className="widget">
                            <h1>Ethnicity</h1>
                        </Grid.Row>
                        <Grid.Row className="widget">
                            <h1>Race</h1>
                            <h1>Race Table and Chart</h1>
                        </Grid.Row>   
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row className="widget">
                            <h3>City Selector</h3>
                            <Dropdown selection options={this.state.selectOptions} onChange={ (e, { value }) => {if (value.length > 2) { 
                                this.setState({curCity: value}); console.log(value); } } } />                                
                        </Grid.Row>
                        <Grid.Row className="widget">
                            <h1>Gender</h1>
                            <h1>Gender Table</h1>
                            <h1>Gender Chart</h1>
                        </Grid.Row>
                    </Grid.Column> 
                </Grid.Row>
            </Grid>
            
        );
    }
}