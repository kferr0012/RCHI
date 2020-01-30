import React, {Component} from 'react';
import '../components/css/dash.css';

import BarGraph from  '../components/TestingBranch/BarGraph'
import PieChart2 from '../components/charts/PieChart2'
import LineGraph from '../components/charts/LineGraph'

import {aggregateFetch} from '../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList} from '../components/Utilities/ListManipulation/filter'
import {combine} from '../components/Utilities/ListManipulation/combine'

export default class UnsheleteredVsSheltered extends Component{

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

    renderDashboards(){

        return(
            <div>

            <div className="container my-2" style={{backgroundColor: "#6f58c9"}}>
            <h2>Sheltered vs Unsheltered</h2>
            <div className="row dash-row">
              <div className="col-md dash-col-com">
                <div className="svu-grid">
                    <div className="svu-r1">
                      <h6>Sheltered Statistics Table</h6>
                    </div>
                    <div className="svu-r2">
                      <h6>Sheltered Household Composition</h6>
                    </div>
                  </div>
                </div>
              <div className="col-md dash-col-com">
                <div className="gen-grid">
                  <div className="svu-r1">
                    {/* <span className="component-header">Homeless Population Trend</span> */}
                    <LineGraph />
                  </div>
                  <div className="svu-r2">
                    {/* FIXME: need to make 2 column format for bar graphs to be side-by-side */}
                    <BarGraph 
                      data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Age"], "subpopulation", ["Total","Unknown Age"])}
                      indexBy = {"subpopulation"}
                      keys = {["total"]}
                    />
                    <BarGraph
                    data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Race"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])}
                    indexBy = {"subpopulation"}
                    keys = {["total"]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md dash-col-com">
                <div className="svu-grid">
                  <div className="svu-r1">
                    <h6>Unsheltered Statistics Table</h6>
                    
                    
                  </div>
                  <div className="svu-r2">
                    <h6>Unsheltered Household Composition</h6>
                    <PieChart2
                    data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Households"],"subpopulation", ["Total"])}
                    footer = {false}
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