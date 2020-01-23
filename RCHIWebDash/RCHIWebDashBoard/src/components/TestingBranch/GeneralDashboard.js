import React from 'react';
import LineGraph from '../charts/LineGraph';
import BarGraph from './BarGraph'
import PieGraph from '../charts/PieChart'
import PieChart2 from '../charts/PieChart2'
import TableComponent2 from '../charts/TableComponent2'
import TableComponent from '../charts/TableComponent'
import { Header, Table} from 'semantic-ui-react';

import '../css/dash.css';

export default class Dashboard extends React.Component {

  constructor(props){
    super(props)

    this.GeneralData = [
      {
        "id":1,
        "subpopulation":"Individuals",
        "year":"2019",
        "type":"Sheltered",
        "total":766
      },
      {
        "id":2,
        "subpopulation":"Individuals",
        "year":"2019",
        "type":"Unsheltered",
        "total":2045
      },
      {
        "id":3,
        "subpopulation":"Individuals",
        "year":"2019",
        "type":"Total Count",
        "total":2811
      },
      {
        "id":4,
        "subpopulation":"Adults (>24)",
        "year":"2019",
        "type":"Sheltered",
        "total":484
      },
      {
        "id":5,
        "subpopulation":"Adults (>24)",
        "year":"2019",
        "type":"Unsheltered",
        "total":1718
      },
      {
        "id":6,
        "subpopulation":"Adults (>24)",
        "year":"2019",
        "type":"Total Count",
        "total":2202
      },
      {
        "id":7,
        "subpopulation":"Youth (18-24)",
        "year":"2019",
        "type":"Sheltered",
        "total":83
      },
      {
        "id":8,
        "subpopulation":"Youth (18-24)",
        "year":"2019",
        "type":"Unsheltered",
        "total": 181
      },
      {
        "id":9,
        "subpopulation":"Youth (18-24)",
        "year":"2019",
        "type":"Total Count",
        "total":264
      },
      {
          "id":10,
          "subpopulation":"Children (<17)",
          "year":"2019",
          "type":"Sheltered",
          "total":199
        },
        {
          "id":11,
          "subpopulation":"Children (<17)",
          "year":"2019",
          "type":"Unsheltered",
          "total": 15
        },
        {
          "id":12,
          "subpopulation":"Children (<17)",
          "year":"2019",
          "type":"Total Count",
          "total":214
        },
        {
          "id":13,
          "subpopulation":"Unknown Ages",
          "year":"2019",
          "type":"Sheltered",
          "total":0
        },
        {
          "id":14,
          "subpopulation":"Unknown Ages",
          "year":"2019",
          "type":"Unsheltered",
          "total": 131
        },
        {
          "id":15,
          "subpopulation":"Unknown Ages",
          "year":"2019",
          "type":"Total Count",
          "total":131
        },
      {
          "id":16,
          "subpopulation":"Households",
          "year":"2019",
          "type":"Sheltered",
          "total":558
        },
        {
          "id":17,
          "subpopulation":"Households",
          "year":"2019",
          "type":"Unsheltered",
          "total": 1843
        },
        {
          "id":18,
          "subpopulation":"Households",
          "year":"2019",
          "type":"Total Count",
          "total":2401
        },
        
      {
          "id":19,
          "subpopulation":"Chronically Homeless",
          "year":"2019",
          "type":"Sheltered",
          "total":77
        },
        {
          "id":20,
          "subpopulation":"Chronically Homeless",
          "year":"2019",
          "type":"Unsheltered",
          "total": 727
        },
        {
          "id":21,
          "subpopulation":"Chronically Homeless",
          "year":"2019",
          "type":"Total Count",
          "total":804
        },
        {
          "id":22,
          "subpopulation":"Families with Children",
          "year":"2019",
          "type":"Sheltered",
          "total":77
        },
        {
          "id":23,
          "subpopulation":"Families with Children",
          "year":"2019",
          "type":"Unsheltered",
          "total": 5
        },
        {
          "id":24,
          "subpopulation":"Families with Children",
          "year":"2019",
          "type":"Total Count",
          "total":82
        },
        
      {
          "id":25,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "year":"2019",
          "type":"Sheltered",
          "total":59
        },
        {
          "id":26,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "year":"2019",
          "type":"Unsheltered",
          "total": 498
        },
        {
          "id":27,
          "subpopulation":"Substance Abuse (Drug or Alcohol)",
          "year":"2019",
          "type":"Total Count",
          "total":557
        },
        {
          "id":28,
          "subpopulation":"Mental Health Conditions",
          "year":"2019",
          "type":"Sheltered",
          "total":148
        },
        {
          "id":29,
          "subpopulation":"Mental Health Conditions",
          "year":"2019",
          "type":"Unsheltered",
          "total": 367
        },
        {
          "id":30,
          "subpopulation":"Mental Health Conditions",
          "year":"2019",
          "type":"Total Count",
          "total":515
        },
        {
          "id":31,
          "subpopulation":"Veteran",
          "year":"2019",
          "type":"Sheltered",
          "total":56
        },
        {
          "id":32,
          "subpopulation":"Veteran",
          "year":"2019",
          "type":"Unsheltered",
          "total": 107
        },
        {
          "id":33,
          "subpopulation":"Veteran",
          "year":"2019",
          "type":"Total Count",
          "total":163
        }
  
  ]

  }

  componentDidMount(){

    //fetch data
    /*
    this.state.url = ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/", 
                      "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"]

    var self = this;
    var myData = []
    for(var i = 0; i< this.state.url.length; i++){
      await fetch(this.state.url[i], {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => response.json())
      .then((data) =>{
          console.log("data found")
          
      })
      .catch(err => {
          console.log("no data found")
      })
    
    }
    
    */
    
  }
  render() {
    return(
      <div className="container my-2">
        <h2>General Sheltered and Unsheltered Information</h2>
        <div className="row dash-row">

          <div className="col-md dash-col-reg">
            <p className="component-header">Overall 21% increase in homeless count from 2018.</p>
            <LineGraph/>
          </div>
          <div className="col-md dash-col-reg">
            <span className="component-header">Homeless Population Trend</span>
            <LineGraph />
          </div>

        </div>

        <div className="row dash-row" style={{height: '500px'}}>

          <div className="col-md dash-col-big">
            <div className="custom-grid">
              <div className="custom-r1">
                <p className="component-header">Race and Ethnicity</p>
                <div>
                <BarGraph height = {200}
                  width = {600}
                  url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race'
                  indexBy = "subpopulation"
                  keys = {["interview", "observation"]}

                  />

                </div>
              </div>
              <div className="custom-r2">
                <div className="custom-r2c1">
                  <p className="component-header">Gender</p>
                    <PieChart2 height = {200}
                    url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Gender'
                    />
                  

                </div>
                <div className="custom-r2c2">
                  <span className="component-header">Ethnicity</span>
                  <PieChart2 height = {200}
                      url = "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/?search=Ethnicity"
                      />
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
            <Table.Row>
            <Table.HeaderCell textAlign='center'>{"Interview"}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{1347}</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
            <Table.HeaderCell textAlign='center'>{"Observational"}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{698}</Table.HeaderCell>
            </Table.Row>
            <PieChart2 height = {50}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Households' />
            </div>

            <div className="col-md dash-col-reg">
            <span className="component-header">Living Situations</span>
            
            </div>


            </div>
            
          </div>
        </div>
      </div>
    );
  }
}