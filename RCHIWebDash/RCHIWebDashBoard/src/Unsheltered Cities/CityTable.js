import React, {Component} from 'react'

import {CustomToggle, CustomMenu} from './components/CustomToggle'
import {Dropdown, Button} from 'react-bootstrap'

import Number from "../components/Numbers/Number";
import Total from '../components/Numbers/Total'
import {Row, Col} from 'antd'

import Select from 'react-select'

import './DottedBox.css';
import '../components/css/dash.css';

import BarGraph from  '../components/TestingBranch/BarGraph'
import PieChart2 from '../components/charts/PieChart2'
import LineGraph from '../components/charts/LineGraph'
import TableComponent4 from '../components/charts/TableComponent4.js';

import {aggregateFetch, expandOnField} from '../components/Utilities/ListManipulation/aggregateFetch'
import {filter, subset, filterList} from '../components/Utilities/ListManipulation/filter'
import { getOverflowOptions } from 'antd/lib/tooltip/placements';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const DottedBox = () => (
    <div className="DottedBox">
      <p className="DottedBox_content">Graph/Table</p>
    </div>
  );


export default class CityTable extends Component{
    constructor(props){
        super(props)

        this.state = {
            cityChoice : "BANNING",

            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/",
                    "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/",
                    "http://127.0.0.1:8000/api/SubpopulationsByCity2019/"],
            Tables : [],
            selectOptions: []
        }

        this.myData = []

    }
    
    getOptions(options){

        var newData = []
        for(var i = 0; i< options.length;i++){
            var newObject = {
                'value' : options[i],
                'label' : options[i]
            }

            newData.push(newObject)
        }

        return newData

    }

    async componentDidMount(){
        console.log("didMount")

        var myTables = await aggregateFetch(this.state.urls, false)
        myTables["GeneralTableSubpopulations2019"] = expandOnField(myTables["GeneralTableSubpopulations2019"], "category")
        myTables["GeneralTableSubpopulationsSheltered2019"] = expandOnField(myTables["GeneralTableSubpopulationsSheltered2019"], "category")
        myTables["SubpopulationsByCity2019"] = expandOnField(myTables["SubpopulationsByCity2019"],"city")
         
        for(const key in myTables["SubpopulationsByCity2019"]){
            myTables["SubpopulationsByCity2019"][key] = expandOnField(myTables["SubpopulationsByCity2019"][key], "category")
        }


        
        this.setState({
            Tables: myTables,
            selectOptions: this.getOptions(Object.keys(myTables["SubpopulationsByCity2019"])),
            rendered : true
        })

        console.log("available Tables")
        console.log(this.state.Tables)

        
    }

    setCityChoice(value){
        this.setState({
            cityChoice : value.value
        })

        console.log("updated state")
    }
    
    runGraphs(){

        console.log("states")
        console.log(this.state)

        const Tables = this.state.Tables
        const cityChoice = this.state.cityChoice
        return(

            <div>

                <Select options={this.state.selectOptions} defaultValue={this.state.selectOptions[0]} onChange={ (value) => this.setCityChoice(value)} />

                <div className="container my-2" style={{backgroundColor: "#6f58c9"}}>
                                <h2>City Level Information</h2>
                                <p>dropdown</p>
                                <div className="row dash-row">
                                    <div className="col-md dash-col-com">
                                        <div className="ct-grid-side">
                                            <div className="ct-side-r1">
                                                <p>Suppopulations Table</p>
                                                <LineGraph />
                                            </div>
                                            <div className="ct-side-r2">
                                                <p>Age Table</p>
                                                <LineGraph />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 dash-col-com">
                                        <div className="ct-grid-center">
                                            <div className="ct-center-r1">
                                                <div className="ct-center-r1c1">
                                                    <p>Chronically Homeless</p>
                                                    <LineGraph />
                                                </div>
                                                <div className="ct-center-r1c2">
                                                    <p>Total Unsheltered Count</p>
                                                    <LineGraph />
                                                </div>
                                                <div className="ct-center-r1c3">
                                                    <p>Percent of District</p>
                                                    <LineGraph />
                                                </div>
                                            </div>
                                            <div className="ct-center-r2">
                                                <div className="ct-center-r2c1">
                                                    <p>Hispanic Table</p>
                                                    <LineGraph />
                                                </div>
                                                <div className="ct-center-r2c2">
                                                    <p>Hispanic Pie Chart</p>
                                                    <PieChart2
                                                        data = {filterList(this.state.Tables["SubpopulationsByCity2019"][this.state.cityChoice]["Ethinicity"],"subpopulation", ["Total"])}
                                                        margin = {{bottom : 60, top : 60, left : 20}}
                                                        />
                                                </div>
                                            </div>
                                            <div className="ct-center-r3">
                                                <span className = "component-header">Race</span>
                                                <BarGraph 
                                                    data = {filterList(this.state.Tables["SubpopulationsByCity2019"][this.state.cityChoice]["Race"],"subpopulation", ["Total"])}
                                                    indexBy = {"subpopulation"}
                                                    keys = {["interview"]}
                                                    margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                                                    />
                                            </div>       
                                        </div>
                                    </div>
                                    <div className="col-md dash-col-com">
                                        <div className="ct-grid-side">
                                            <div className="ct-side-r1-grid">
                                                <div className="ct-side-r1r1">
                                                    <p>Gender table</p>
                                                    <LineGraph />
                                                </div>
                                                <div className="ct-side-r1r2">
                                                    <p>Gender chart</p>
                                                    <BarGraph 
                                                    data = {filterList(this.state.Tables["SubpopulationsByCity2019"][this.state.cityChoice]["Gender"], "subpopulation", ["Total"])}
                                                    indexBy = {"subpopulation"}
                                                    keys = {["interview"]}
                                                    margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ct-side-r2">
                                                <p>Race Table</p>
                                                <BarGraph 
                                                    data = {this.state.Tables["SubpopulationsByCity2019"]["BEAUMONT"]["Gender"]}
                                                    indexBy = {"subpopulation"}
                                                    keys = {["interview"]}
                                                    margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
            </div>    
        )
    }
    render(){
    
        return(
            <div>
                {this.state.rendered ? this.runGraphs() : 0}
            </div>
        )
    }
}
