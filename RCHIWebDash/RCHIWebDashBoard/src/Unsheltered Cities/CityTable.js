import React, {Component} from 'react'

import {CustomToggle, CustomMenu} from './components/CustomToggle'
import {Dropdown, Button} from 'react-bootstrap'

import Number from "../components/Numbers/Number";
import Total from '../components/Numbers/Total'
import {Row, Col} from 'antd'

import Select from 'react-select'

import './DottedBox.css';

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
            cityChoice : "BEAUMONT",
            value : "",
            trigger : true,
            fetched: false,

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

    runGraphs(){

        console.log("states")
        console.log(this.state)

        const Tables = this.state.Tables
        return(

            <div>

                <Select options={this.state.selectOptions} onChange={ (value) => {
                    this.setState({
                        cityChoice : value.value
                    })
                }} />

                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="space-around" align="middle" >
                <Col className="gutter-row" span={7}>
                    <h5>Age Table</h5> 
                    <DottedBox >col-1</DottedBox>
                </Col>
                <Col className="gutter-row" span={10}>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            num-1
                            <DottedBox>num-1</DottedBox>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            num-2
                            <DottedBox>num-2</DottedBox>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            num-3
                            <DottedBox>num-3</DottedBox>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={7}>
                    <h5>Gender</h5> 
                    <DottedBox> col-3</DottedBox>
                </Col>
            </Row>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="center" align="top" >
                <Col className="gutter-row"  span={7}>
                        <h5>Subpopulation</h5> 
                        <DottedBox >col-1</DottedBox>
                </Col>
                <Col className="gutter-row" span={17}>
                        <Row>
                            <Col className="gutter-row" span={16}>
                                <row>
                                    <Col className="gutter-row" span={12}>
                                        graph
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        
                                    </Col>
                                </row>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                bar graph
                                <DottedBox>num-2</DottedBox>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={16}>
                                line graph
                                <DottedBox>num-1</DottedBox>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                table
                                <DottedBox>num-2</DottedBox>
                            </Col>
                        </Row>
                </Col>
            </Row>

        <div style = {{height: 1000, width: 800, position: "flex"}}>
            <PieChart2
                data = {this.state.Tables["SubpopulationsByCity2019"][this.state.cityChoice]["Ethinicity"]}
            />
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
