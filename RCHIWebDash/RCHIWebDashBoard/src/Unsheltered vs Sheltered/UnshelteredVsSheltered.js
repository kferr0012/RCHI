import React, {Component} from 'react';
import BarGraph from  '../components/TestingBranch/BarGraph';
import LineGraph from '../components/charts/LineGraph';
import '../components/css/dash.css';

export default class UnsheleteredVsSheltered extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
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
                {/* <span className="component-header">Bar Graphs</span> */}
                {/* <BarGraph
                  url="http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Age"
                  indexBy="subpopulation"
                  keys={["interview", "observation"]}        
                />
                <BarGraph 
                  url="http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race"
                  indexBy="subpopulation"
                  keys={["interview", "observation"]}        
                /> */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}