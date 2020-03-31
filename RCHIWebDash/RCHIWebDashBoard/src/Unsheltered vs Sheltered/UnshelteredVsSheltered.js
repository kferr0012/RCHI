import React, {Component} from 'react';

import '../components/css/dash.css';

import BarGraph from  '../components/TestingBranch/BarGraph'
import PieChart2 from '../components/charts/PieChart2'
import LineGraph from '../components/charts/LineGraph'
import TableComponent4 from '../components/charts/TableComponent4.js';

import {aggregateFetch, expandOnField} from '../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../components/Utilities/ListManipulation/fetchTest'

import { shelteredVsUnshelteredMani } from '../components/Utilities/ChartDataManipulation/barDataManipulaton'
import { ContainerWidth } from '../components/chartTablesStyling/chartTablesStyling'
import {filter, subset, filterList } from '../components/Utilities/ListManipulation/filter'
import {combine} from '../components/Utilities/ListManipulation/combine'
import {Header,Segment, Container, Grid} from 'semantic-ui-react'

import{router} from '../components/Utilities/constants/routing'

const FILTERED_COUNTS = [
  'Total',
  'Veteran No',
  'Unknown Veteran',
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
  'Couch',
  'Households (Interview)',
  'Families w/ Children (Interview)'

]

const TableOrder = ["Individuals", "Adults (>24)", "Youth (18-24)", "Children", "Unknown Age", "Male", "Female", "Transgender", "Gender Non-Conforming", "Unknown Gender", "Hispanic", "Non-Hispanic", "White", "Native Hawaiin", "Black", "Asian", "American Indian", "Multiple Races", "Unknown Race", "Households", "Chronically Homeless"]
export default class UnsheleteredVsSheltered extends Component{

    constructor(props){
        super(props)

        this.state = {
            urls : [router.host + '/' + router.root + '/' + router.formerYear + "/GeneralTableSubpopulations/",
                    router.host + '/' + router.root + '/' + router.formerYear + "/GeneralTableSubpopulationsSheltered/",
                    router.host + '/' + router.root + '/' + router.activeYear + "/GeneralTableSubpopulations/",
                    router.host + '/' + router.root + '/' + router.activeYear + "/GeneralTableSubpopulationsSheltered/",],
            Tables : [],
            render : false,
        }
        
    }

    formatData(data){

      //2019
      data[router.formerYear + "/GeneralTableSubpopulations-unexpanded"] = data[router.formerYear + "/GeneralTableSubpopulations"]
      data[router.formerYear + "/" + "GeneralTableSubpopulationsSheltered-unexpanded"] = data[router.formerYear + "/" + "GeneralTableSubpopulationsSheltered"]
      data[router.formerYear + "/" + "GeneralTableSubpopulations"] = expandOnField(data[router.formerYear + "/" + "GeneralTableSubpopulations"], "category")
      data[router.formerYear + "/" + "GeneralTableSubpopulationsSheltered"] = expandOnField(data[router.formerYear + "/" + "GeneralTableSubpopulationsSheltered"], "category")
      //2020
      data[router.activeYear + "/GeneralTableSubpopulations-unexpanded"] = data[router.activeYear + "/GeneralTableSubpopulations"]
      data[router.activeYear + "/GeneralTableSubpopulationsSheltered-unexpanded"] = data[router.activeYear + "/GeneralTableSubpopulationsSheltered"]
      data[router.activeYear + "/GeneralTableSubpopulations"] = expandOnField(data[router.activeYear + "/GeneralTableSubpopulations"], "category")
      data[router.activeYear + "/GeneralTableSubpopulationsSheltered"] = expandOnField(data[router.activeYear + "/GeneralTableSubpopulationsSheltered"], "category")

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
      var result = this.state.Tables[router.formerYear + '/GeneralTableSubpopulations']["Total"]
                                                                        .concat(this.state.Tables[router.formerYear + '/GeneralTableSubpopulations']["Age"])
                                                                        .concat(this.state.Tables[router.formerYear + '/GeneralTableSubpopulations']["Gender"])
                                                                        .concat(this.state.Tables[router.formerYear + '/GeneralTableSubpopulations']["Ethnicity"])
                                                                        .concat(this.state.Tables[router.formerYear + '/GeneralTableSubpopulations']["Race"])
                                                                        .concat(this.state.Tables[router.formerYear + '/GeneralTableSubpopulations']["Subpopulations"])
                                                                        .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations-unexpanded"])

      return result
    }

    getOrderedShelteredData(){
      var result = this.state.Tables[router.formerYear + "/GeneralTableSubpopulationsSheltered"]["Total"]
                                                                        .concat(this.state.Tables[router.formerYear + "/GeneralTableSubpopulationsSheltered"]["Age"])
                                                                        .concat(this.state.Tables[router.formerYear + "/GeneralTableSubpopulationsSheltered"]["Gender"])
                                                                        .concat(this.state.Tables[router.formerYear + "/GeneralTableSubpopulationsSheltered"]["Ethnicity"])
                                                                        .concat(this.state.Tables[router.formerYear + "/GeneralTableSubpopulationsSheltered"]["Race"])
                                                                        .concat(this.state.Tables[router.formerYear + "/GeneralTableSubpopulationsSheltered"]["Subpopulations"])
                                                                        .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered-unexpanded"])

      return result
    }

    renderDashboards(){

      return(
          <div>
          
          <div className="container my-2" >
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
                      position = "absolute"
                      />
                  </div>
                  <div className="svu-r2-h25">
                    <br/>
                    {/* <span className="component-header"><div>Sheltered Household</div>Composition</span> */}
                    <TableComponent4
                    tableName = "Sheltered Household Composition"
                    data = {this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered"]["Households"].sort( (a,b) => { return b.total - a.total})}
                    header = {false}
                    divHeight = {"100%"}
                    // position = "absolute"
                  />
                  </div>
                </div>
              </div>
            <div className="col-md-6 dash-col-com">
              <div className="svu-grid-2">
                <div className="svu-r1-2">
                {<span className="component-header">Homeless Population Trend</span>}
                  <LineGraph 
                    margin = {{top: 40, right: 40, bottom: 60, left: 40 }}
                    max = {2500}
                    tickValues = {4}
                    gridYValues = {4}
                  />
                </div>
                <div className="svu-r2">

            <span className="component-header">Age</span>
            <BarGraph 
              data = {shelteredVsUnshelteredMani(filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered"]["Age"], "subpopulation", ["Total","Unknown Age"]).concat(
                                    filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Age"], "subpopulation", ["Total","Unknown Age"])
              ), ["Unsheltered", "Sheltered"])}
              indexBy = {"subpopulation"}
              keys = {["Unsheltered", "Sheltered"]}
              margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
              tickValues={4}
              gridYValues={4}
              maxValue={3000}
              groupMode = {'stacked'}
            />
            </div>
            <div className="svu-r2">
            <span className="component-header"> Race</span>
            <BarGraph
              data = {shelteredVsUnshelteredMani(filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Race"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"]).concat(
                    filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered"]["Race"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])
              ), ["Unsheltered", "Sheltered"])}
              indexBy = {"subpopulation"}
              keys = {["Unsheltered", "Sheltered"]}
              margin = {{ top: 50, right: 30, bottom: 50, left: 50 }}
              tickValues={4}
              gridYValues={4}
              maxValue={2000}
              groupMode = {'stacked'}
            />
            </div>                
              </div>
            </div>
            <div className="col-md dash-col-com">
              <div className="svu-grid">
                <div className="svu-r1">
                  
                  <TableComponent4
                    //data = {this.state.Tables["GeneralTableSubpopulations-unexpanded"].concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations-unexpanded"])}
                    data = {filterList(this.getOrderedUnshelteredData(),"subpopulation", FILTERED_COUNTS)}
                    tableName = "Unsheltered Statistics"
                    expandIndex = {"year"}
                    header = {true}
                    height = {"120%"}
                    position = "absolute"
                  />
                  
                </div>
                <div className="svu-r2-h25">
                  {/* <p className="component-header">Unsheltered Household Composition</p> */}

                  <br/>
                  <TableComponent4
                    tableName = "Unsheltered Household Composition"
                    data = {this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Households"].sort((a,b) => {return b.total - a.total})}
                    header = {false}
                    height = {"100%"}
                    // position = "ob"
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
            {this.state.rendered ? this.renderDashboards() : (
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
            </div>
        )
    }
}
