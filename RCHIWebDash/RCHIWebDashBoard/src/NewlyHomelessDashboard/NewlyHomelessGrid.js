import React, { Component } from 'react'
import {aggregateFetch, aggregateFetchbyConstants, expandOnField} from '../components/Utilities/ListManipulation/aggregateFetch'

import '../components/css/dash.css'
import TableComponent4 from '../components/charts/TableComponent4';
import LineGraph from '../components/charts/LineGraph';
import PieChart2 from '../components/charts/PieChart2';
import BarGraph from '../components/TestingBranch/BarGraph';
import {Header,Segment} from 'semantic-ui-react'
import {filterList} from '../components/Utilities/ListManipulation/filter'
import { router } from '../components/Utilities/constants/routing';
const FILTER_COLUMNS = [

"Veteran No",
"No Substance Abuse",
"Unknown Substance Abuse",
"No PTSD",
"Unknown PTSD",
"No Mental Health Conditions",
"Unknown Mental Health Conditions",
"No Physical Disability",
"Unknown Physical Disability",
"No Developmental Disability",
"Unknown Developmental Disability",
"No Brain Injury",
"Unknown Brain Injury",
"Not Victim of Domestic Violence",
"Unknown Victim of Domestic Violence",
"No AIDS or HIV",
"Unknown AIDS or HIV",
"Jail Release 90 Days: Probation",
"Jail Release 90 Days: Parole",
"Jail Release 90 Days: Completed Sentence",
"Jail Release 90 Days: (Unspecified)",
"Jail Release 12 Months: Probation",
"Jail Release 12 Months: Parole",
"Jail Release 12 Months: Completed Sentence",
"Jail Release 12 Months: (Unspecified)",
"Unknown Jail",
"Not Chronically Homeless",
    

]
export default class NewlyHomelessGrid extends Component{
    constructor(){
        super();
        this.state = {
            urls: [router.host + '/' + router.root + '/' + router.activeYear +"/NewlyHomelessByCity/"],
            rendered : false,
            Tables : []
        }
    }

    async componentDidMount(){
        
        var Tables = await aggregateFetch(this.state.urls)

        this.setState({
            Tables : Tables,
            rendered : true,

        })
        
    }

    renderDashboard(){

        console.log("STATE")
        console.log(this.state)
        return(
            <div className="container my-2">
            <Segment>
                <Header size="huge"  textAlign='center'>
                    Unsheltered - Newly Homeless
                    <Header sub> 2020 Riverside County Pit Count</Header>
                </Header>
            </Segment>
  
            <div className="row dash-row">
  
              <div className="col-sm-8 dash-col-com">
                <div className="gen-grid">
                    <div className = "gen-r2">

                        <div className="gen-r2c2">
                        <TableComponent4 
                            data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Age"],"subpopulation", FILTER_COLUMNS)}
                            tableName = "Age"
                            height = "120%"

                        />
                        
    
                        </div>
                        <div className="gen-r2c1">
                        <div className="gen-r2c1r1">
                            <p className="component-header">Ethnicity</p>
                            <PieChart2 
                            data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Ethnicity"],"subpopulation", ["Total"])}
                            margin = {{top: 30, bottom: 20}}
                            />
                        </div>
                        <div className="gen-r2c1r2">
                        <p className="component-header">Gender</p>
                        <PieChart2 
                            data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Gender"],"subpopulation", ["Total"])}
                            margin = {{top: 30,bottom: 20}}
                            />
                            
                        </div>
                        </div>

                    </div>
                    
                 
                    <div style = {{position: "relative",
                                    display: "grid",
                                    height: "100%"}}>
                    <p className="component-header">Race</p>
                    <BarGraph 
                      data = {this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Race"]}
                      indexBy = {"subpopulation"}
                      keys = {["total"]}
                      margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                    />
                    </div>

                </div>
              </div>
              <div className="col-sm-4 dash-col-com" >
                {/*<span className="component-header">Unsheltered Only Demographic</span> */}
                <div className="gen-r2">
                  <TableComponent4 
                    data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Subpopulations"],"subpopulation", FILTER_COLUMNS)}
                    tableName = "Subpopulations"
                    height = "200%"
                    />
                    
                </div>
              </div>
            </div>
          </div>
        )
    }
    render(){
        return(
            <div>
                {this.state.rendered ? 
                    this.renderDashboard()
                    : 0}
            </div>
        )
    }
}