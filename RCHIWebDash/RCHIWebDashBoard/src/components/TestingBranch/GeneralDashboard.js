import LineGraph from '../charts/LineGraph';
import BarGraph from '../../components/TestingBranch/BarGraph'
import PieChart2 from '../charts/PieChart2'
import TableComponent2 from '../charts/TableComponent2'
import { Header, Table} from 'semantic-ui-react';

import '../css/dash.css';

import React, {Component} from 'react';
import '../css/dash.css';

import {aggregateFetch} from '../../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList} from '../../components/Utilities/ListManipulation/filter'
import {combine} from '../../components/Utilities/ListManipulation/combine'
import { Bar } from '@nivo/bar';

export default class Dashboard extends Component{

    constructor(props){
        super(props)

        this.state = {
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/",
                    "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"],
            Tables : [],
            render : false
        }
        
    }

    async componentDidMount(){
        console.log("didMount")
        var myTables = await aggregateFetch(this.state.urls)
        this.setState({
            Tables: myTables,
            rendered : true
        })

        console.log("available Tables")
        console.log(this.state.Tables)
    }

    renderDashboards() {
      return(
        <div className="container my-2">
          <h2>General Sheltered and Unsheltered Information</h2>
          <div className="row dash-row">
  
            <div className="col-md dash-col-reg">
              <p className="component-header">Overall 21% increase in homeless count from 2018.</p>
              {/* <LineGraph/> */}
              {/* <TableComponent2
                data = {this.GeneralData}
                tableName = "Sheltered Statistics"
              /> */}
            </div>
            <div className="col-md dash-col-reg">
              <span className="component-header">Homeless Population Trend</span>
              <LineGraph />
            </div>
  
          </div>
  
          <div className="row dash-row">
  
            <div className="col-md dash-col-big">
              <div className="gen-grid">
                <div className="gen-r1">
                  <p className="component-header">Race and Ethnicity</p>
                  <BarGraph
                    data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Race"], "subpopulation", ["Total"])}
                    indexBy = "subpopulation"
                    keys = {["interview", "observation"]}
                  />
                </div>
                <div className="gen-r2">
                  <div className="gen-r2c1">
                    <p className="component-header">Gender</p>
                    <PieChart2
                      data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Gender"],"subpopulation", ["Total", "Transgender", "Gender Non-Conforming"])}
                    />
                  </div>
                  <div className="gen-r2c2">
                    <p className="component-header">Ethnicity</p>
                    {
                      <PieChart2
                      data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Ethinicity"],"subpopulation", ["Total", "Transgender", "Gender Non-Conforming"])}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md dash-col-big">
              <p className="component-header">Unsheltered Only Demographic</p>
              <div className="row dash-row">
                <div className="col-md dash-col-reg">
                  <p className="component-header">18%</p>
                  <p>have mental health issues</p>    
                  <br/>
                  <p className="component-header">24%</p>
                  <p>have substance abuse</p>
                  <br/>
                  <p className="component-header">18%</p>
                  <p>have physical disability</p>
                  <br/>
                  <p className="component-header">18%</p>
                  <p>experience PTSD</p>
                </div>
                <div className="col-md dash-col-reg">
                  <p className="component-header">2045</p>
                  <p>Total Unsheltered Count</p>
                  <Table Cell Structured>
                    <Table.Row>
                      <Table.HeaderCell textAlign='center'>{"Interview"}</Table.HeaderCell>
                      <Table.HeaderCell textAlign='center'>{1347}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell textAlign='center'>{"Observational"}</Table.HeaderCell>
                      <Table.HeaderCell textAlign='center'>{698}</Table.HeaderCell>
                    </Table.Row>
                  </Table>
                  {/* <PieChart2
                    url='http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Households'
                  /> */}
                </div>
                <div className="col-md dash-col-reg">
                  <span className="component-header">Living Situations</span>
                  <PieChart2
                    data = {this.state.Tables["GeneralTableSubpopulations2019"]["Living Situation"]}
                  />
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