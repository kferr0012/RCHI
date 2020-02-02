import React, {Component} from 'react';
import BarGraph from  '../components/TestingBranch/BarGraph';
import LineGraph from '../components/charts/LineGraph';
import TableComponent4 from '../components/charts/TableComponent4.js';
import '../components/css/dash.css';

export default class UnsheleteredVsSheltered extends Component{
  constructor(props){
    super(props)

    this.const_data_for_unsheltered_table = [
      {
        "id":1,
        "subpopulation":"Individuals",
        "category":"2018",
        "total":1685
      },
      {
        "id":2,
        "subpopulation":"Adults(>=25)",
        "category":"2018",
        "total":1350
      },
      {
        "id":3,
        "subpopulation":"Individuals",
        "category":"2019",
        "total":2045
      },
      {
        "id":4,
        "subpopulation":"Adults(>=25)",
        "category":"2019",
        "total":1718
      },
      {
        "id":5,
        "subpopulation":"Youth(18-24)",
        "category":"2018",
        "total":177
      },
      {
        "id":6,
        "subpopulation":"Youth(18-24)",
        "category":"2019",
        "total":181
      },
      {
        "id":7,
        "subpopulation":"Children(<=17)",
        "category":"2018",
        "total":4
      },
      {
        "id":8,
        "subpopulation":"Children(<=17)",
        "category":"2019",
        "total":15
      },
      {
        "id":9,
        "subpopulation":"Unknown Age",
        "category":"2018",
        "total":154
      },
      {
        "id":10,
        "subpopulation":"Unknown Age",
        "category":"2019",
        "total":131
      },
      {
        "id":11,
        "subpopulation":"Male",
        "category":"2018",
        "total":1131
      },
      {
        "id":12,
        "subpopulation":"Male",
        "category":"2019",
        "total":1384
      },
      {
        "id":13,
        "subpopulation":"Female",
        "category":"2018",
        "total":488
      },
      {
        "id":14,
        "subpopulation":"Female",
        "category":"2019",
        "total":488
      },
      {
        "id":15,
        "subpopulation":"Transgender",
        "category":"2018",
        "total":6
      },
      {
        "id":16,
        "subpopulation":"Transgender",
        "category":"2019",
        "total":11
      },
      {
        "id":17,
        "subpopulation":"Gender Non-Con",
        "category":"2018",
        "total":8
      },
      {
        "id":18,
        "subpopulation":"Gender Non-Con",
        "category":"2019",
        "total":7
      },
      {
        "id":19,
        "subpopulation":"Unknown Gender",
        "category":"2018",
        "total":52
      },
      {
        "id":20,
        "subpopulation":"Unknown Gender",
        "category":"2019",
        "total":95
      },
      {
        "id":21,
        "subpopulation":"White",
        "category":"2018",
        "total":934
      },
      {
        "id":22,
        "subpopulation":"White",
        "category":"2019",
        "total":1111
      },
      {
        "id":23,
        "subpopulation":"Native Hawaiian",
        "category":"2018",
        "total":26
      },
      {
        "id":24,
        "subpopulation":"Native Hawaiian",
        "category":"2019",
        "total":21
      },
      {
        "id":25,
        "subpopulation":"Black",
        "category":"2018",
        "total":216
      },
      {
        "id":26,
        "subpopulation":"Black",
        "category":"2019",
        "total":241
      },
      {
        "id":27,
        "subpopulation":"Asian",
        "category":"2018",
        "total":19
      },
      {
        "id":28,
        "subpopulation":"Asian",
        "category":"2019",
        "total":26
      },
      {
        "id":29,
        "subpopulation":"American Indian",
        "category":"2018",
        "total":103
      },
      {
        "id":30,
        "subpopulation":"American Indian",
        "category":"2019",
        "total":66
      },
      {
        "id":31,
        "subpopulation":"Multiple Races",
        "category":"2018",
        "total":52
      },
      {
        "id":32,
        "subpopulation":"Multiple Races",
        "category":"2019",
        "total":199
      },
      {
        "id":33,
        "subpopulation":"Unknown Race",
        "category":"2018",
        "total":335
      },
      {
        "id":34,
        "subpopulation":"Unknown Race",
        "category":"2019",
        "total":381
      },
      {
        "id":35,
        "subpopulation":"Households",
        "category":"2018",
        "total":1335
      },
      {
        "id":36,
        "subpopulation":"Households",
        "category":"2019",
        "total":1843
      },
      {
        "id":37,
        "subpopulation":"Chronically Homeless",
        "category":"2018",
        "total":387
      },
      {
        "id":38,
        "subpopulation":"Chronically Homeless",
        "category":"2019",
        "total":727
      }
    ];

    this.const_data_for_sheltered_table = [
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
                    <TableComponent4
                      data = {this.const_data_for_sheltered_table}
                      tableName = "Sheltered Statistics Table"
                    />
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
                {/*<LineGraph />*/}
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
                <TableComponent4
                  data = {this.const_data_for_unsheltered_table}
                  tableName = "Unsheltered Statistics Table"
                />
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
