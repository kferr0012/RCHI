import LineGraph from '../charts/LineGraph';
import BarGraph from '../../components/TestingBranch/BarGraph'
import BarChart from '../../components/reformatedCharts/BarChart'
import PieChart2 from '../charts/PieChart2'
import TableComponent2 from '../charts/TableComponent2'
import TableComponent4 from '../charts/TableComponent4'
import { Header, Table, Segment,Container,Grid} from 'semantic-ui-react';

import React, {Component} from 'react';
import '../css/dash.css';

import {aggregateFetch, expandOnField} from '../../components/Utilities/ListManipulation/aggregateFetch'
import {router} from '../../components/Utilities/constants/routing'
import fetchTest from '../../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList, NumberCreator} from '../../components/Utilities/ListManipulation/filter'
import {combine, combineCounts} from '../../components/Utilities/ListManipulation/combine'
import { Bar } from '@nivo/bar';
import NumberPercentage from "../Numbers/NumberPercentage";

import Change from "../Numbers/Change";
import TotalGeneral from "../Numbers/TotalGeneral";
import { ContainerWidth } from "../chartTablesStyling/chartTablesStyling"


const FILTER_COLUMNS = [
'Total',
'Not Veteran',
'Veteran No',
'Unknown Veteran',
'No Substance Abuse',
'Unknown Substance Abuse',
'PTSD',
'No PTSD',
'Unknown PTSD',
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
'Chronically Homeless	447',
'Not Chronically Homeless',
'Couch'
]

export default class Dashboard extends Component{

    constructor(props){
        super(props)

        this.state = {
            urls :  [router.host + '/' + router.root  + '/' + router.activeYear +'/' + "GeneralTableSubpopulations/",
                     router.host + '/' + router.root  + '/' + router.activeYear +'/' + "GeneralTableSubpopulationsSheltered/",
                     router.host + '/' + router.root  + '/' + router.activeYear +'/' + "GeneralTableSubpopulationsTotalCounts/",
                     router.host + '/' + router.root  + '/' + router.formerYear +'/' + "GeneralTableSubpopulations/",
                     router.host + '/' + router.root  + '/' + router.formerYear +'/' + "GeneralTableSubpopulationsSheltered/"],

            Tables : [],
            NumberValues: null,
            render : false
        }
    }

    formatData(Tables){


      //reformat get tables unexpands and expanded by category (easier to process certain components)
      for(var index in Tables){
        Tables[index + "-unexpanded"] = Tables[index]
        Tables[index] = expandOnField(Tables[index], "category")
      }

      return Tables
    }

    getOrderedTable(){
      //concat in a specific order to sort data by group

      var unshelteredData = this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Total"]
      .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Age"])
      .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Subpopulations"])

      var shelteredData= this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered"]["Total"]
      .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered"]["Age"])
      .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsSheltered"]["Subpopulations"])

      var totalCounts = this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Total"]
      .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Age"])
      .concat(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Subpopulations"])


      var resultData = shelteredData.concat(unshelteredData).concat(totalCounts)

      return resultData

    }
    async componentDidMount(){

        var myTables = await aggregateFetch(this.state.urls, false)

        const NumberValues = NumberCreator(myTables[router.activeYear + "/GeneralTableSubpopulations"])


        this.setState({
            Tables: this.formatData(myTables),
            rendered : true,
            NumberValues: NumberValues
        })



    }

    renderDashboards() {
      // console.log("GENRAL TABLE: ",this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"].filter((val) => { return (val.subpopulation === "Mental Health Conditions" || val.subpopulation === "Individuals")}))

      return(

        <div className="container my-2" >

          <Segment>
              <Header size="huge"  textAlign='center'>
                  General Sheltered and Unsheltered Information
                  <Header sub> 2020 Riverside County Pit Count</Header>
              </Header>
          </Segment>
          <div className="row dash-row">

            <div className="col-md dash-col-reg">
             

              <TableComponent4
                data={filterList(this.getOrderedTable(),"subpopulation", FILTER_COLUMNS)}
                expandIndex = {"_type"}
                header = {true}
                height = {"100%"}
                position = "absolute"
              />
            </div>
            <div className="col-md dash-col-reg">
              {<span className="component-header">Homeless Population Trend</span>}
              <LineGraph
                margin = {{ top: 20, right: 30, bottom: 70, left :60}}
                max = {2200}
                tickValues = {4}
                gridYValues = {4}
              />
            </div>

          </div>

          <div className="row dash-row">

            <div className="col-md dash-col-big">
              <div className="gen-grid">
                <div className="gen-r1">
                  <br/>
                  <p className="component-header">Race</p>
                  <BarGraph
                    data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Race"], "subpopulation", ["Total"])}
                    indexBy = "subpopulation"
                    keys = {["total"]}
                    margin = {{left: 45, top: 50, bottom: 30}}
                    tickValues={4}
                    gridYValues={4}
                    maxValue={2000}
                  />
                </div>
                <div className="gen-r2">
                  <div className="gen-r2c1">
                    {/* <div className="gen-r2c1r1"> */}
                      <p className="component-header">Gender</p>
                      <PieChart2
                        data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Gender"],"subpopulation", ["Total", "Transgender", "Gender Non-Conforming"])}
                        margin = {{top: 50, bottom: 40, left: 30, right: 30}}
                      />
                    {/* </div>
                     <div className="gen-r2c1r2">
                      <TableComponent4
                        data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Gender"],"subpopulation", ["Total"])}
                        header = {false}
                        height = {"100%"}
                      />
                    </div> */}
                  </div>
                  <div className="gen-r2c2">
                    <p className="component-header">Ethnicity</p>

                    <PieChart2
                      data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulationsTotalCounts"]["Ethnicity"],"subpopulation", ["Total"])}
                      margin = {{top: 50, bottom: 40, left: 30, right: 30}}
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
                    <Change height = {50}
                             url = {router.host + '/' + router.root + '/Trends/?search=2020'}
                        />  
                    </div>


                    <div className="gen-s-r2">
                        <NumberPercentage 
                          height = {50}
                          data={this.state.NumberValues}
                          subpopulation={"Mental Health Conditions"}
                          header ={"mental health issues"}
                        />
                    </div>
                    <div className="gen-s-r5">
                        <NumberPercentage 
                          height = {50}
                          data={this.state.NumberValues}
                          subpopulation={"PTSD"}
                          header ={"PTSD"}
                        />
                    </div>
                    <div className="gen-s-r3">
                        <NumberPercentage 
                          height = {50}
                          data={this.state.NumberValues}
                          subpopulation={"Substance Abuse"}
                          header ={"substance abuse"}
                        />
                    </div>
                    <div className="gen-s-r4">
                        <NumberPercentage 
                          height = {50}
                          data={this.state.NumberValues}
                          subpopulation={"Physical Disability"}
                          header ={"physical disability"}
                        />
                    </div>
                </div>
                <div className="gen-3r">

                <div className="gen-3r-r1">
                    <span className = "component-header" style = {{textAlign: "middle"}}></span>
                  </div>

                  <div className="gen-3r-r2">
                    <span className = "component-header" style = {{fontSize:"40px" ,textAlign: "middle"}}>
                        <TotalGeneral 
                          data={this.state.NumberValues}
                          subpopulation={"Individuals"}
                          height = {50}
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
                        <Table.HeaderCell textAlign='center'>{this.state.NumberValues['Individuals'].interview}</Table.HeaderCell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell textAlign='center'>{"Observational"}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>{this.state.NumberValues['Individuals'].observation}</Table.HeaderCell>
                      </Table.Row>
                    </Table>
                  </div>
                  <div className="gen-3r-r5">
                    {/* <span className = "component-header">Household Type</span> */}
                    <TableComponent4
                      data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Households"],"subpopulation", ["Total"])}
                      header={false}
                      tableHeight= {"100%"}
                      divHeight= {"12.0em"}
                      tableName={"Household Composition"}
                      position= {"absolute"}
                    />
                  </div>

                </div>
                <div className="gen-r2c1">
                  <div className="gen-r2c1r1">
                    <span className="component-header">Living Situations</span>
                    <PieChart2
                      data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Living Situation"],"subpopulation", ["Couch"])}
                      margin = {{top:0,bottom:0,left:30, right: 0}}
                      enableRadialLabels= {false}
                    />
                  </div>
                  <div className="gen-r2c1r2">
                    <TableComponent4
                      data = {filterList(this.state.Tables[router.activeYear + "/GeneralTableSubpopulations"]["Living Situation"],"subpopulation", ["Couch"]).sort( (a,b) => { return b.total - a.total})}
                      header = {false}
                      percentage_flag = {true}
                      height = {"100%"}
                    />
                  </div>
              </div>
              </div>
            </div>
          </div>
          {/* <hr></hr>
                  <p className="component-header">Overall, there was a 21% increase in homeless count from 2019.</p> */}
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
