import LineGraph from '../charts/LineGraph';
import BarGraph from '../../components/TestingBranch/BarGraph'
import PieChart2 from '../charts/PieChart2'
import TableComponent2 from '../charts/TableComponent2'
import TableComponent4 from '../charts/TableComponent4'
import { Header, Table} from 'semantic-ui-react';

import '../css/dash.css';

import React, {Component} from 'react';
import '../css/dash.css';

import {aggregateFetch} from '../../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList} from '../../components/Utilities/ListManipulation/filter'
import {combine} from '../../components/Utilities/ListManipulation/combine'
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
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/",
                    "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"],
            Tables : [],
            render : false
        }

        this.table2data = [
        {
          "id":1,
          "subpopulation":"Individuals",
          "category":"Sheltered",
          "total":766
        },
        {
          "id":2,
          "subpopulation":"Individuals",
          "category":"Unsheltered",
          "total":2045
        },
        {
          "id":3,
          "subpopulation":"Individuals",
          "category":"Total Count",
          "total":2811
        },
        {
          "id":4,
          "subpopulation":"Adults",
          "category":"Sheltered",
          "total":484
        },
        {
          "id":5,
          "subpopulation":"Adults",
          "category":"Unsheltered",
          "total":1718
        },
        {
          "id":6,
          "subpopulation":"Adults",
          "category":"Total Count",
          "total":2202
        },
        {
          "id":7,
          "subpopulation":"Youth (18-24)",
          "category":"Sheltered",
          "total":83
        },
        {
          "id":8,
          "subpopulation":"Youth (18-24)",
          "category":"Unsheltered",
          "total":181
        },
        {
          "id":9,
          "subpopulation":"Youth (18-24)",
          "category":"Total Count",
          "total":264
        },
        {
          "id":10,
          "subpopulation":"Children (<=17)",
          "category":"Unsheltered",
          "total":199
        },
        {
          "id":11,
          "subpopulation":"Children (<=17)",
          "category":"Sheltered",
          "total":15
        },
        {
          "id":12,
          "subpopulation":"Children (<=17)",
          "category":"Total Count",
          "total":214
        },
        {
          "id":13,
          "subpopulation":"Unknown Ages",
          "category":"Sheltered",
          "total":0
        },
        {
          "id":14,
          "subpopulation":"Unknown Ages",
          "category":"Unsheltered",
          "total":131
        },
        {
          "id":15,
          "subpopulation":"Unknown Ages",
          "category":"Total Count",
          "total":131
        },
        {
          "id":16,
          "subpopulation":"Households",
          "category":"Sheltered",
          "total":558
        },
        {
          "id":17,
          "subpopulation":"Households",
          "category":"Unsheltered",
          "total":1843
        },
        {
          "id":18,
          "subpopulation":"Households",
          "category":"Total Count",
          "total":2401
        },
        {
          "id":19,
          "subpopulation":"Chronically Homeless",
          "category":"Sheltered",
          "total":77
        },
        {
          "id":20,
          "subpopulation":"Chronically Homeless",
          "category":"Unsheltered",
          "total":727
        },
        {
          "id":21,
          "subpopulation":"Chronically Homeless",
          "category":"Total Count",
          "total":804
        },
        {
          "id":22,
          "subpopulation":"Families with Children",
          "category":"Sheltered",
          "total":77
        },
        {
          "id":23,
          "subpopulation":"Families with Children",
          "category":"Unsheltered",
          "total":5
        },
        {
          "id":24,
          "subpopulation":"Families with Children",
          "category":"Total Count",
          "total":82
        },
        {
          "id":25,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Sheltered",
          "total":59
        },
        {
          "id":26,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Unsheltered",
          "total":498
        },
        {
          "id":27,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "category":"Total Count",
          "total":557
        },
        {
          "id":28,
          "subpopulation":"Mental Health Conditions",
          "category":"Sheltered",
          "total":148
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "category":"Unsheltered",
          "total":367
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "category":"Total Count",
          "total":515
        },
        {
          "id":30,
          "subpopulation":"Veterans",
          "category":"Sheltered",
          "total":56
        },
        {
          "id":31,
          "subpopulation":"Veterans",
          "category":"Unsheltered",
          "total":107
        },
        {
          "id":32,
          "subpopulation":"Veterans",
          "category":"Total Count",
          "total":163
        },
      ]
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
              <TableComponent4
                data={this.table2data}
              />
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

                    <PieChart2
                    data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Ethinicity"],"subpopulation", ["Total"])}
                    />

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md dash-col-big">
              <p className="component-header">Unsheltered Only Demographic</p>
              <div className="row dash-row">
                <div className="col-md dash-col-reg">
                    <Mental height = {50}
                            url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                    />
                    <PTSD height = {50}
                          url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                    />
                    <Substance height = {50}
                               url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                    />
                    <Physical height = {50}
                              url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                    />

                </div>
                <div className="col-md dash-col-reg">
                    <TotalGeneral height = {50}
                              url = {'http://127.0.0.1:8000/api/Trends/?search=2019'}
                    />
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

                  <PieChart2
                    data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Households"],"subpopulation", ["Total"])}
                  />
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
