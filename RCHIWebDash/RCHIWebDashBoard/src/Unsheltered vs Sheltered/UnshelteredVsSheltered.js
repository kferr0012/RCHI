import React, {Component} from 'react';

import '../components/css/dash.css';

import BarGraph from  '../components/TestingBranch/BarGraph'
import PieChart2 from '../components/charts/PieChart2'
import LineGraph from '../components/charts/LineGraph'
import TableComponent4 from '../components/charts/TableComponent4.js';

import {aggregateFetch, expandOnField} from '../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList} from '../components/Utilities/ListManipulation/filter'
import {combine} from '../components/Utilities/ListManipulation/combine'
import {Header,Segment} from 'semantic-ui-react'
const FILTERED_COUNTS = [
  'Total',
  'Veteran No',
  'Not Chronically Homeless',
  'No Substance Abuse',
  'Unknown Substance Abuse',
  'PTSD',
  'No PTSD',
  'Unknown PTSD',
  'Mental Health Conditions',
  'No Mental Health Conditions',
  'Unknown Mental Health Conditions',
  'Physical Disability',
  'No Physical Disability',
  'Unknown Physical Disability',
  'Developmental Disability',
  'No Developmental Disability',
  'Unknown Developmental Disability',
  'Brain Injury',
  'No Brain Injury',
  'Unknown Brain Injury',
  'Victim of Domestic Violence',
  'Not Victim of Domestic Violence',
  'Unknown Victim of Domestic Violence',
  'AIDS or HIV',
  'No AIDS or HIV',
  'Unknown AIDS or HIV',
  'Jail Release 90 Days: Probation',
  'Jail Release 90 Days: Parole',
  'Jail Release 90 Days: Completed Sentence',
  'Jail Release 90 Days: (Unspecified)',
  'Jail Release 12 Months: Probation',
  'Jail Release 12 Months: Parole',
  'Jail Release 12 Months: Completed Sentence',
  'Jail Release 12 Months: (Unspecified)',
  'No Jail',
  'Unknown Jail',
  'Woods',
  'Vehicle',
  'UnderBridge',
  'Street',
  'Park',
  'Other',
  'Bus',
  'AbandonedBuilding',
  'Adults Only',
  'Children Only',
  'Adults and Children',
  'Families w/ Children',
  'Not Veteran',
  'Households',
  'Encampment',
  'Couch'

]
export default class UnsheleteredVsSheltered extends Component{

    constructor(props){
        super(props)

        this.state = {
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations/",
                    "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered/",
                    "http://127.0.0.1:8000/api/2020/GeneralTableSubpopulations/",
                    "http://127.0.0.1:8000/api/2020/GeneralTableSubpopulationsSheltered/",],
            Tables : [],
            render : false
        }
        
    }

    formatData(data){

      //2019
      data["GeneralTableSubpopulations-unexpanded"] = data["GeneralTableSubpopulations"]
      data["GeneralTableSubpopulationsSheltered-unexpanded"] = data["GeneralTableSubpopulationsSheltered"]
      data["GeneralTableSubpopulations"] = expandOnField(data["GeneralTableSubpopulations"], "category")
      data["GeneralTableSubpopulationsSheltered"] = expandOnField(data["GeneralTableSubpopulationsSheltered"], "category")
      //2020
      data["2020/GeneralTableSubpopulations-unexpanded"] = data["2020/GeneralTableSubpopulations"]
      data["2020/GeneralTableSubpopulationsSheltered-unexpanded"] = data["2020/GeneralTableSubpopulationsSheltered"]
      data["2020/GeneralTableSubpopulations"] = expandOnField(data["2020/GeneralTableSubpopulations"], "category")
      data["2020/GeneralTableSubpopulationsSheltered"] = expandOnField(data["2020/GeneralTableSubpopulationsSheltered"], "category")

      return data
    }
    async componentDidMount(){
        console.log("didMount")
        var myTables = await aggregateFetch(this.state.urls, false)
        
        this.setState({
            Tables: this.formatData(myTables),
            rendered : true
        })

        console.log("available Tables")
        console.log(this.state.Tables)
    }

    getOrderedUnshelteredData(){
      var result = this.state.Tables["GeneralTableSubpopulations"]["Total"]
                                                                        .concat(this.state.Tables["GeneralTableSubpopulations"]["Age"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulations"]["Gender"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulations"]["Ethnicity"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulations"]["Race"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulations"]["Subpopulations"])
                                                                        .concat(this.state.Tables["2020/GeneralTableSubpopulations-unexpanded"])

      return result
    }

    getOrderedShelteredData(){
      var result = this.state.Tables["GeneralTableSubpopulationsSheltered"]["Total"]
                                                                        .concat(this.state.Tables["GeneralTableSubpopulationsSheltered"]["Age"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulationsSheltered"]["Gender"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulationsSheltered"]["Ethnicity"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulationsSheltered"]["Race"])
                                                                        .concat(this.state.Tables["GeneralTableSubpopulationsSheltered"]["Subpopulations"])
                                                                        .concat(this.state.Tables["2020/GeneralTableSubpopulationsSheltered-unexpanded"])

      return result
    }

    renderDashboards(){

        return(
            <div>
            
            <div className="container my-2">
            <Segment>
                <Header size="huge"  textAlign='center'>
                    Sheltered vs Unsheltered
                    <Header sub> 2020 Riverside County Pit Count</Header>
                </Header>
            </Segment>
            <div className="row dash-row">
              <div className="col-md dash-col-com">
                <div className="svu-grid">
                    <div className="svu-r1">
                        
                        <TableComponent4
                        data = {filterList(this.getOrderedShelteredData(),"subpopulation", FILTERED_COUNTS)}
                        expandIndex = {"year"}
                        tableName = "Sheltered Statistics"
                        header = {true}
                        height = {"120%"}
                        />
                    </div>
                    <div className="svu-r2-h25">
                      <span className="component-header">Sheltered Households</span>>
                      <PieChart2
                        data = {filterList(this.state.Tables["2020/GeneralTableSubpopulationsSheltered"]["Households"],"subpopulation", ["Total"])}
                        footer = {false}
                        margin = {{ top: 25, right: 0, bottom: 25, left: 0 }}
                      />
                    </div>
                  </div>
                </div>
              <div className="col-md-6 dash-col-com">
                <div className="svu-grid-2">
                  <div className="svu-r1-2">
                    <LineGraph 
                      margin = {{top: 40, right: 40, bottom: 60, left: 40 }}
                    />
                  </div>
                  <div className="svu-r2">

                    <span className="component-header">Age</span>
                    <BarGraph 
                      data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Age"], "subpopulation", ["Total","Unknown Age"])}
                      indexBy = {"subpopulation"}
                      keys = {["total"]}
                      margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                    />
                  </div>
                  <div className="svu-r2">
                    <span className="component-header"> Race</span>
                    <BarGraph
                      data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Race"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])}
                      indexBy = {"subpopulation"}
                      keys = {["total"]}
                      margin = {{ top: 50, right: 30, bottom: 50, left: 50 }}
                    />
                  </div>                  
                </div>
              </div>
              <div className="col-md dash-col-com">
                <div className="svu-grid">
                  <div className="svu-r1">
                    
                    <TableComponent4
                      //data = {this.state.Tables["GeneralTableSubpopulations-unexpanded"].concat(this.state.Tables["2020/GeneralTableSubpopulations-unexpanded"])}
                      data = {filterList(this.getOrderedUnshelteredData(),"subpopulation", FILTERED_COUNTS)}
                      tableName = "Unsheltered Statistics"
                      expandIndex = {"year"}
                      header = {true}
                      height = {"120%"}
                    />
                    
                  </div>
                  <div className="svu-r2-h25">
                    <p className="component-header">Unsheltered Households </p>
                    <PieChart2
                      data = {filterList(this.state.Tables["2020/GeneralTableSubpopulations"]["Households"],"subpopulation", ["Total"])}
                      footer = {false}
                      margin = {{ top: 25, right: 0, bottom: 25, left: 0 }}
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
