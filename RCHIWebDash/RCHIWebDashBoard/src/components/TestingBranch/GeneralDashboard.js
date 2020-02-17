import LineGraph from '../charts/LineGraph';
import BarGraph from '../../components/TestingBranch/BarGraph'
import PieChart2 from '../charts/PieChart2'
import TableComponent2 from '../charts/TableComponent2'
import TableComponent4 from '../charts/TableComponent4'
import { Header, Table} from 'semantic-ui-react';

import React, {Component} from 'react';
import '../css/dash.css';

import {aggregateFetch, aggregateFetchbyConstants} from '../../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList} from '../../components/Utilities/ListManipulation/filter'
import {combine, combineCounts} from '../../components/Utilities/ListManipulation/combine'
import { Bar } from '@nivo/bar';
import Mental from "../Numbers/Mental";
import Physical from "../Numbers/Physical";
import PTSD from "../Numbers/PTSD";
import Substance from "../Numbers/Substance";
import TotalGeneral from "../Numbers/TotalGeneral";

export default class Dashboard extends Component{

    constructor(props){
        super(props)

        this.state = {
            urls :  ["http://127.0.0.1:8000/api/2020/GeneralTableSubpopulations/",
                     "http://127.0.0.1:8000/api/2020/GeneralTableSubpopulationsSheltered/",
                     "http://127.0.0.1:8000/api/GeneralTableSubpopulations/",
                     "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered/"],
            
            Tables : [],
            render : false
        }

        this.table2data = [
        {
          "id":1,
          "subpopulation":"Individuals",
          "category":"Sheltered",
 					
 					"_type":"Sheltered",
          "total":766
        },
        {
          "id":2,
          "subpopulation":"Individuals",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":2045
        },
        {
          "id":3,
          "subpopulation":"Individuals",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":2811
        },
        {
          "id":4,
          "subpopulation":"Adults",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":484
        },
        {
          "id":5,
          "subpopulation":"Adults",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":1718
        },
        {
          "id":6,
          "subpopulation":"Adults",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":2202
        },
        {
          "id":7,
          "subpopulation":"Youth (18-24)",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":83
        },
        {
          "id":8,
          "subpopulation":"Youth (18-24)",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":181
        },
        {
          "id":9,
          "subpopulation":"Youth (18-24)",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":264
        },
        {
          "id":10,
          "subpopulation":"Children (<=17)",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":199
        },
        {
          "id":11,
          "subpopulation":"Children (<=17)",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":15
        },
        {
          "id":12,
          "subpopulation":"Children (<=17)",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":214
        },
        {
          "id":13,
          "subpopulation":"Unknown Ages",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":0
        },
        {
          "id":14,
          "subpopulation":"Unknown Ages",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":131
        },
        {
          "id":15,
          "subpopulation":"Unknown Ages",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":131
        },
        {
          "id":16,
          "subpopulation":"Households",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":558
        },
        {
          "id":17,
          "subpopulation":"Households",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":1843
        },
        {
          "id":18,
          "subpopulation":"Households",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":2401
        },
        {
          "id":19,
          "subpopulation":"Chronically Homeless",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":77
        },
        {
          "id":20,
          "subpopulation":"Chronically Homeless",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":727
        },
        {
          "id":21,
          "subpopulation":"Chronically Homeless",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":804
        },
        {
          "id":22,
          "subpopulation":"Families with Children",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":77
        },
        {
          "id":23,
          "subpopulation":"Families with Children",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":5
        },
        {
          "id":24,
          "subpopulation":"Families with Children",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":82
        },
        {
          "id":25,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":59
        },
        {
          "id":26,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":498
        },
        {
          "id":27,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":557
        },
        {
          "id":28,
          "subpopulation":"Mental Health Conditions",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":148
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":367
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":515
        },
        {
          "id":30,
          "subpopulation":"Veterans",
          "category":"Sheltered",
 					"_type":"Sheltered",
          "total":56
        },
        {
          "id":31,
          "subpopulation":"Veterans",
          "category":"Unsheltered",
 					"_type":"Unsheltered",
          "total":107
        },
        {
          "id":32,
          "subpopulation":"Veterans",
          "category":"Total Count",
 					"_type":"Total Count",
          "total":163
        },
      ]
    }

    async componentDidMount(){
        
        var fetchString = this.props.host + this.props.root + '2020/GeneralTableSubpopulations/'

        var myTables = await aggregateFetch(this.state.urls)
        this.setState({
            Tables: myTables,
            rendered : true
        })

        
        
    }

    renderDashboards() {
      return(
                      
        <div className="container my-2">
          <h2>General Sheltered and Unsheltered Information</h2>
          <div className="row dash-row">

            <div className="col-md dash-col-reg">
              {/* <p className="component-header">Overall 21% increase in homeless count from 2018.</p> */}
          
              <TableComponent4
                data={this.table2data}
                header = {true}
                height = {"100%"}
              />
            </div>
            <div className="col-md dash-col-reg">
              {<span className="component-header">Homeless Population Trend</span>}
              <LineGraph
                margin = {{ top: 0, right: 30, bottom: 70, left :60}}
              />
            </div>

          </div>

          <div className="row dash-row">

            <div className="col-md dash-col-big">
              <div className="gen-grid">
                <div className="gen-r1">
                  <p className="component-header">Race and Ethnicity</p>
                  <BarGraph
                    data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Race"], "subpopulation", ["Total"])}
                    indexBy = "subpopulation"
                    keys = {["interview", "observation"]}
                    margin = {{left: 45, top: 50, bottom: 30}}
                  />
                </div>
                <div className="gen-r2">
                  <div className="gen-r2c1">
                    <div className="gen-r2c1r1">
                      <p className="component-header">Gender</p>
                      <PieChart2
                        data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Gender"],"subpopulation", ["Total", "Transgender", "Gender Non-Conforming"])}
                        margin = {{top: 35, bottom: 10}}
                      />
                    </div>
                    <div className="gen-r2c1r2">
                      <TableComponent4
                        data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Gender"],"subpopulation", ["Total"])}
                        header = {false}
                        height = {"100%"}
                      />
                    </div>
                  </div>
                  <div className="gen-r2c2">
                    <p className="component-header">Ethnicity</p>

                    <PieChart2
                      data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Ethnicity"],"subpopulation", ["Total"])}
                      margin = {{top: 40, bottom: 40, left: 30, right: 30}}  
                    />

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md dash-col-big" >
              {/*<span className="component-header">Unsheltered Only Demographic</span> */}
              <div className="gen-grid-2">
                <div className = "gen-s-r" >
                      
                    <div className="gen-s-r1">
                        <Mental height = {50}
                                url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                        />
                    </div>
                    <div className="gen-s-r4">
                        <PTSD height = {50}
                              url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                        />
                    </div>
                    <div className="gen-s-r2">
                        <Substance height = {50}
                                  url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                        />
                    </div>
                    <div className="gen-s-r3">
                        <Physical height = {50}
                                  url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                        />
                    </div>
                </div>
                <div className="gen-3r">
                  
                <div className="gen-3r-r1">
                    <span className = "component-header" style = {{textAlign: "middle"}}></span>
                  </div>

                  <div className="gen-3r-r2">
                    <span className = "component-header" style = {{fontSize:"40px" ,textAlign: "middle"}}>
                        <TotalGeneral height = {50}
                                  url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                        />
                      </span>
                  </div>
                  <div className="gen-3r-r3">
                  
                    <span className = "component-header">Total Unsheltered Count</span>
                  </div>
                  <div className="gen-3r-r4">
                    
                    <Table style = {{height: "100%"}}Cell Structured>
                      <Table.Row>
                        <Table.HeaderCell textAlign='center'>{"Interview"}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>{1347}</Table.HeaderCell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell textAlign='center'>{"Observational"}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>{698}</Table.HeaderCell>
                      </Table.Row>
                    </Table>
                  </div>
                  <div className="gen-3r-r5">
                    <span className = "component-header">Househhold Type</span>
                    <PieChart2
                      data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Households"],"subpopulation", ["Total"])}
                      margin = {{top:40, bottom: 40, left: 40, right: 40}}
                    />
                  </div>
                  
                </div>
                <div className="gen-r2c1">
                  <div className="gen-r2c1r1">
                    <span className="component-header">Living Situations</span>
                    <PieChart2
                      data = {this.state.Tables["2020/GeneralTableSubpopulations"]["Living Situation"]}
                      margin = {{top:50,bottom:50,left:60, right: 60}}
                    />
                  </div>
                  <div className="gen-r2c1r2">
                    <TableComponent4
                      data = {this.state.Tables["2020/GeneralTableSubpopulations"]["Living Situation"]}
                      header = {false}
                      height = {"100%"}
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
            {this.state.rendered ? this.renderDashboards() : 0}
            </div>
        )
    }
}
