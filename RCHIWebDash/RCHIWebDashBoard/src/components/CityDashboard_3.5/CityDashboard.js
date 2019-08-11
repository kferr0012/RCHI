import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { Container, Row, Col } from 'react-bootstrap';

import './CityTables.css'
import { citynames, base, SubPopHeaders, Catergories, Titles } from './constants';

export default class CityDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            curCity: 'RIVERSIDE',
            households: {},
            citynames: citynames,
            selectOptions: []
          };
    }

    componentWillMount() {
        this.fetchSubpopulationData();
        this.fetchHouseholdData();
        var options = [];
        for (var i = 0; i < this.state.citynames.length; i++)
        {
            options.push({
                value: this.state.citynames[i],
                label: this.state.citynames[i]
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
        const {citynames} = this.state;
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
        for (var i = 0; i < this.state.citynames.length ; i++)
        {
            data[this.state.citynames[i]] = JSON.parse(JSON.stringify(base));
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
        return(
            <Container className="dashboard">
                <Row>
                    <Col md={3}>
                        <Row>
                            <Col>
                                <h1>Age</h1>
                                <h1>Age Chart</h1>
                                <h1>Age Table</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1>Subpopulations</h1>
                                <h1>Subpopulations Table</h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={8}>
                                <Row>
                                    <Col>
                                        <div className="widget">
                                            <h3>2019 Riverside County PIT Count</h3>
                                            <h4>{this.state.curCity}</h4>
                                            <h4>City Level Information</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="widget">
                                            <h4>City Totals</h4>
                                            <Row>
                                                <Col md={4}>
                                                    <h5>Chronically Homeless</h5>
                                                    <h5>| Some Num |</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <h5>Total Unsheleterd</h5>
                                                    <h5>| Some Num |</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <h5>Percent of District</h5>
                                                    <h5>| Some Num |</h5>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h1>Ethnicity</h1>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <Row>
                                    <Col>
                                        <h1>City Selector</h1>
                                        <Select options={this.state.selectOptions} onChange={ (value) => {if (value.value.length > 2) { 
                                            this.setState({curCities: [value.value]}); console.log(value); } } } />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h1>Gender</h1>
                                        <h1>Gender Table</h1>
                                        <h1>Gender Chart</h1>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h1>Race</h1>
                                <h1>Race Table and Chart</h1>
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
            
        );
    }
}