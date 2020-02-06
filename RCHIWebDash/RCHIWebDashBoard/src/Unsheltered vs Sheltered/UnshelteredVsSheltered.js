import React, {Component} from 'react';

import '../components/css/dash.css';

import BarGraph from  '../components/TestingBranch/BarGraph'
import PieChart2 from '../components/charts/PieChart2'
import LineGraph from '../components/charts/LineGraph'
import TableComponent4 from '../components/charts/TableComponent4.js';

import {aggregateFetch} from '../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../components/Utilities/ListManipulation/fetchTest'

import {filter, subset, filterList} from '../components/Utilities/ListManipulation/filter'
import {combine} from '../components/Utilities/ListManipulation/combine'


const data =[
{
  "id":1,
  "subpopulation":"Individuals",
  "year":"2018",
  "category":"2018",
  "total":1685
},
{
  "id":2,
  "subpopulation":"Adults(>=25)",
  "year":"2018",
  "category":"2018",
  "total":1350
},
{
  "id":3,
  "subpopulation":"Individuals",
  "year":"2019",
  "category":"2019",
  "total":2045
},
{
  "id":4,
  "subpopulation":"Adults(>=25)",
  "year":"2019",
  "category":"2019",
  "total":1718
},
{
  "id":5,
  "subpopulation":"Youth(18-24)",
  "year":"2018",
  "category":"2018",
  "total":177
},
{
  "id":6,
  "subpopulation":"Youth(18-24)",
  "year":"2019",
  "category":"2019",
  "total":181
},
{
  "id":7,
  "subpopulation":"Children(<=17)",
  "year":"2018",
  "category":"2018",
  "total":4
},
{
  "id":8,
  "subpopulation":"Children(<=17)",
  "year":"2019",
  "category":"2019",
  "total":15
},
{
  "id":9,
  "subpopulation":"Unknown Age",
  "year":"2018",
  "category":"2018",
  "total":154
},
{
  "id":10,
  "subpopulation":"Unknown Age",
  "year":"2019",
  "category":"2019",
  "total":131
},
{
  "id":11,
  "subpopulation":"Male",
  "year":"2018",
  "category":"2018",
  "total":1131
},
{
  "id":12,
  "subpopulation":"Male",
  "year":"2019",
  "category":"2019",
  "total":1384
},
{
  "id":13,
  "subpopulation":"Female",
  "year":"2018",
  "category":"2018",
  "total":488
},
{
  "id":14,
  "subpopulation":"Female",
  "year":"2019",
  "category":"2019",
  "total":488
},
{
  "id":15,
  "subpopulation":"Transgender",
  "year":"2018",
  "category":"2018",
  "total":6
},
{
  "id":16,
  "subpopulation":"Transgender",
  "year":"2019",
  "category":"2019",
  "total":11
},
{
  "id":17,
  "subpopulation":"Gender Non-Con",
  "year":"2018",
  "category":"2018",
  "total":8
},
{
  "id":18,
  "subpopulation":"Gender Non-Con",
  "year":"2019",
  "category":"2019",
  "total":7
},
{
  "id":19,
  "subpopulation":"Unknown Gender",
  "year":"2018",
  "category":"2018",
  "total":52
},
{
  "id":20,
  "subpopulation":"Unknown Gender",
  "year":"2019",
  "category":"2019",
  "total":95
},
{
  "id":21,
  "subpopulation":"White",
  "year":"2018",
  "category":"2018",
  "total":934
},
{
  "id":22,
  "subpopulation":"White",
  "year":"2019",
  "category":"2019",
  "total":1111
},
{
  "id":23,
  "subpopulation":"Native Hawaiian",
  "year":"2018",
  "category":"2018",
  "total":26
},
{
  "id":24,
  "subpopulation":"Native Hawaiian",
  "year":"2019",
  "category":"2019",
  "total":21
},
{
  "id":25,
  "subpopulation":"Black",
  "year":"2018",
  "category":"2018",
  "total":216
},
{
  "id":26,
  "subpopulation":"Black",
  "year":"2019",
  "category":"2019",
  "total":241
},
{
  "id":27,
  "subpopulation":"Asian",
  "year":"2018",
  "category":"2018",
  "total":19
},
{
  "id":28,
  "subpopulation":"Asian",
  "year":"2019",
  "category":"2019",
  "total":26
},
{
  "id":29,
  "subpopulation":"American Indian",
  "year":"2018",
  "category":"2018",
  "total":103
},
{
  "id":30,
  "subpopulation":"American Indian",
  "year":"2019",
  "category":"2019",
  "total":66
},
{
  "id":31,
  "subpopulation":"Multiple Races",
  "year":"2018",
  "category":"2018",
  "total":52
},
{
  "id":32,
  "subpopulation":"Multiple Races",
  "year":"2019",
  "category":"2019",
  "total":199
},
{
  "id":33,
  "subpopulation":"Unknown Race",
  "year":"2018",
  "category":"2018",
  "total":335
},
{
  "id":34,
  "subpopulation":"Unknown Race",
  "year":"2019",
  "category":"2019",
  "total":381
},
{
  "id":35,
  "subpopulation":"Households",
  "year":"2018",
  "category":"2018",
  "total":1335
},
{
  "id":36,
  "subpopulation":"Households",
  "year":"2019",
  "category":"2019",
  "total":1843
},
{
  "id":37,
  "subpopulation":"Chronically Homeless",
  "year":"2018",
  "category":"2018",
  "total":387
},
{
  "id":38,
  "subpopulation":"Chronically Homeless",
  "year":"2019",
  "category":"2019",
  "total":727
}
];

const data_for_sheltered_table = [
  {
    "id":1,
    "subpopulation":"Individuals",
    "category":"2018",
    "total":631
  },
  {
    "id":2,
    "subpopulation":"Adults(>=25)",
    "category":"2018",
    "total":415
  },
  {
    "id":3,
    "subpopulation":"Individuals",
    "category":"2019",
    "total":766
  },
  {
    "id":4,
    "subpopulation":"Adults(>=25)",
    "category":"2019",
    "total":484
  },
  {
    "id":5,
    "subpopulation":"Youth(18-24)",
    "category":"2018",
    "total":69
  },
  {
    "id":6,
    "subpopulation":"Youth(18-24)",
    "category":"2019",
    "total":83
  },
  {
    "id":7,
    "subpopulation":"Children(<=17)",
    "category":"2018",
    "total":147
  },
  {
    "id":8,
    "subpopulation":"Children(<=17)",
    "category":"2019",
    "total":199
  },
  {
    "id":9,
    "subpopulation":"Unknown Age",
    "category":"2018",
    "total":0
  },
  {
    "id":10,
    "subpopulation":"Unknown Age",
    "category":"2019",
    "total":0
  },
  {
    "id":11,
    "subpopulation":"Male",
    "category":"2018",
    "total":354
  },
  {
    "id":12,
    "subpopulation":"Male",
    "category":"2019",
    "total":418
  },
  {
    "id":13,
    "subpopulation":"Female",
    "category":"2018",
    "total":272
  },
  {
    "id":14,
    "subpopulation":"Female",
    "category":"2019",
    "total":344
  },
  {
    "id":15,
    "subpopulation":"Transgender",
    "category":"2018",
    "total":4
  },
  {
    "id":16,
    "subpopulation":"Transgender",
    "category":"2019",
    "total":2
  },
  {
    "id":17,
    "subpopulation":"Gender Non-Con",
    "category":"2018",
    "total":1
  },
  {
    "id":18,
    "subpopulation":"Gender Non-Con",
    "category":"2019",
    "total":2
  },
  {
    "id":19,
    "subpopulation":"Unknown Gender",
    "category":"2018",
    "total":0
  },
  {
    "id":20,
    "subpopulation":"Unknown Gender",
    "category":"2019",
    "total":0
  },
  {
    "id":21,
    "subpopulation":"White",
    "category":"2018",
    "total":432
  },
  {
    "id":22,
    "subpopulation":"White",
    "category":"2019",
    "total":515
  },
  {
    "id":23,
    "subpopulation":"Native Hawaiian",
    "category":"2018",
    "total":10
  },
  {
    "id":24,
    "subpopulation":"Native Hawaiian",
    "category":"2019",
    "total":9
  },
  {
    "id":25,
    "subpopulation":"Black",
    "category":"2018",
    "total":133
  },
  {
    "id":26,
    "subpopulation":"Black",
    "category":"2019",
    "total":199
  },
  {
    "id":27,
    "subpopulation":"Asian",
    "category":"2018",
    "total":10
  },
  {
    "id":28,
    "subpopulation":"Asian",
    "category":"2019",
    "total":4
  },
  {
    "id":29,
    "subpopulation":"American Indian",
    "category":"2018",
    "total":22
  },
  {
    "id":30,
    "subpopulation":"American Indian",
    "category":"2019",
    "total":12
  },
  {
    "id":31,
    "subpopulation":"Multiple Races",
    "category":"2018",
    "total":24
  },
  {
    "id":32,
    "subpopulation":"Multiple Races",
    "category":"2019",
    "total":27
  },
  {
    "id":33,
    "subpopulation":"Unknown Race",
    "category":"2018",
    "total":0
  },
  {
    "id":34,
    "subpopulation":"Unknown Race",
    "category":"2019",
    "total":0
  },
  {
    "id":35,
    "subpopulation":"Households",
    "category":"2018",
    "total":471
  },
  {
    "id":36,
    "subpopulation":"Households",
    "category":"2019",
    "total":558
  },
  {
    "id":37,
    "subpopulation":"Chronically Homeless",
    "category":"2018",
    "total":87
  },
  {
    "id":38,
    "subpopulation":"Chronically Homeless",
    "category":"2019",
    "total":77
  }
];


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
                        
                        <TableComponent4
                        data = {data_for_sheltered_table}
                        tableName = "Sheltered Statistics"
                        />
                    </div>
                    <div className="svu-r2-h25">
                      <span className="component-header">Sheltered Households</span>>
                      <PieChart2
                        data = {filterList(this.state.Tables["GeneralTableSubpopulationsSheltered2019"]["Household"],"subpopulation", ["Total"])}
                        footer = {false}
                        margin = {{ top: 25, right: 0, bottom: 25, left: 0 }}
                      />
                    </div>
                  </div>
                </div>
              <div className="col-md dash-col-com">
                <div className="svu-grid-2">
                  <div className="svu-r1-2">
                    {/* <span className="component-header">Homeless Population Trend</span> */}
                    <LineGraph />
                  </div>
                  <div className="svu-r2">

                    <span className="component-header">Age</span>
                    <BarGraph 
                      data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Age"], "subpopulation", ["Total","Unknown Age"])}
                      indexBy = {"subpopulation"}
                      keys = {["total"]}
                      margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                    />
                  </div>
                  <div className="svu-r2">
                    <span className="component-header"> Ethnicity</span>
                    <BarGraph
                      data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Race"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])}
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
                      data = {data}
                      tableName = "Unsheltered Statistics"

                    />
                    
                  </div>
                  <div className="svu-r2-h25">
                    <p className="component-header">Unsheltered Households </p>
                    <PieChart2
                      data = {filterList(this.state.Tables["GeneralTableSubpopulations2019"]["Households"],"subpopulation", ["Total"])}
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
