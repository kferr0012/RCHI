import React, {Component} from 'react'

import BarGraph from '../components/TestingBranch/BarGraph'
import PieGraph from "../components/charts/PieGraph";
import PieChart2 from "../components/charts/PieChart2"
import TableComponent from "../components/charts/TableComponent"

export default class GeneralTable extends Component{
    constructor(props){
        super(props)

        this.const_data_for_unsheltered_table = [
          {
            "id":1,
            "subpopulation":"Individuals",
            "year":"2018",
            "total":1685
          },
          {
            "id":2,
            "subpopulation":"Adults(>=25)",
            "year":"2018",
            "total":1350
          },
          {
            "id":3,
            "subpopulation":"Individuals",
            "year":"2019",
            "total":2045
          },
          {
            "id":4,
            "subpopulation":"Adults(>=25)",
            "year":"2019",
            "total":1718
          },
          {
            "id":5,
            "subpopulation":"Youth(18-24)",
            "year":"2018",
            "total":177
          },
          {
            "id":6,
            "subpopulation":"Youth(18-24)",
            "year":"2019",
            "total":181
          },
          {
            "id":7,
            "subpopulation":"Children(<=17)",
            "year":"2018",
            "total":4
          },
          {
            "id":8,
            "subpopulation":"Children(<=17)",
            "year":"2019",
            "total":15
          },
          {
            "id":9,
            "subpopulation":"Unknown Age",
            "year":"2018",
            "total":154
          },
          {
            "id":10,
            "subpopulation":"Unknown Age",
            "year":"2019",
            "total":131
          },
          {
            "id":11,
            "subpopulation":"Male",
            "year":"2018",
            "total":1131
          },
          {
            "id":12,
            "subpopulation":"Male",
            "year":"2019",
            "total":1384
          },
          {
            "id":13,
            "subpopulation":"Female",
            "year":"2018",
            "total":488
          },
          {
            "id":14,
            "subpopulation":"Female",
            "year":"2019",
            "total":488
          },
          {
            "id":15,
            "subpopulation":"Transgender",
            "year":"2018",
            "total":6
          },
          {
            "id":16,
            "subpopulation":"Transgender",
            "year":"2019",
            "total":11
          },
          {
            "id":17,
            "subpopulation":"Gender Non-Con",
            "year":"2018",
            "total":8
          },
          {
            "id":18,
            "subpopulation":"Gender Non-Con",
            "year":"2019",
            "total":7
          },
          {
            "id":19,
            "subpopulation":"Unknown Gender",
            "year":"2018",
            "total":52
          },
          {
            "id":20,
            "subpopulation":"Unknown Gender",
            "year":"2019",
            "total":95
          },
          {
            "id":21,
            "subpopulation":"White",
            "year":"2018",
            "total":934
          },
          {
            "id":22,
            "subpopulation":"White",
            "year":"2019",
            "total":1111
          },
          {
            "id":23,
            "subpopulation":"Native Hawaiian",
            "year":"2018",
            "total":26
          },
          {
            "id":24,
            "subpopulation":"Native Hawaiian",
            "year":"2019",
            "total":21
          },
          {
            "id":25,
            "subpopulation":"Black",
            "year":"2018",
            "total":216
          },
          {
            "id":26,
            "subpopulation":"Black",
            "year":"2019",
            "total":241
          },
          {
            "id":27,
            "subpopulation":"Asian",
            "year":"2018",
            "total":19
          },
          {
            "id":28,
            "subpopulation":"Asian",
            "year":"2019",
            "total":26
          },
          {
            "id":29,
            "subpopulation":"American Indian",
            "year":"2018",
            "total":103
          },
          {
            "id":30,
            "subpopulation":"American Indian",
            "year":"2019",
            "total":66
          },
          {
            "id":31,
            "subpopulation":"Multiple Races",
            "year":"2018",
            "total":52
          },
          {
            "id":32,
            "subpopulation":"Multiple Races",
            "year":"2019",
            "total":199
          },
          {
            "id":33,
            "subpopulation":"Unknown Race",
            "year":"2018",
            "total":335
          },
          {
            "id":34,
            "subpopulation":"Unknown Race",
            "year":"2019",
            "total":381
          },
          {
            "id":35,
            "subpopulation":"Households",
            "year":"2018",
            "total":1335
          },
          {
            "id":36,
            "subpopulation":"Households",
            "year":"2019",
            "total":1843
          },
          {
            "id":37,
            "subpopulation":"Chronically Homeless",
            "year":"2018",
            "total":387
          },
          {
            "id":38,
            "subpopulation":"Chronically Homeless",
            "year":"2019",
            "total":727
          }
        ];

        this.const_data_for_sheltered_table = [
          {
            "id":1,
            "subpopulation":"Individuals",
            "year":"2018",
            "total":631
          },
          {
            "id":2,
            "subpopulation":"Adults(>=25)",
            "year":"2018",
            "total":415
          },
          {
            "id":3,
            "subpopulation":"Individuals",
            "year":"2019",
            "total":766
          },
          {
            "id":4,
            "subpopulation":"Adults(>=25)",
            "year":"2019",
            "total":484
          },
          {
            "id":5,
            "subpopulation":"Youth(18-24)",
            "year":"2018",
            "total":69
          },
          {
            "id":6,
            "subpopulation":"Youth(18-24)",
            "year":"2019",
            "total":83
          },
          {
            "id":7,
            "subpopulation":"Children(<=17)",
            "year":"2018",
            "total":147
          },
          {
            "id":8,
            "subpopulation":"Children(<=17)",
            "year":"2019",
            "total":199
          },
          {
            "id":9,
            "subpopulation":"Unknown Age",
            "year":"2018",
            "total":0
          },
          {
            "id":10,
            "subpopulation":"Unknown Age",
            "year":"2019",
            "total":0
          },
          {
            "id":11,
            "subpopulation":"Male",
            "year":"2018",
            "total":354
          },
          {
            "id":12,
            "subpopulation":"Male",
            "year":"2019",
            "total":418
          },
          {
            "id":13,
            "subpopulation":"Female",
            "year":"2018",
            "total":272
          },
          {
            "id":14,
            "subpopulation":"Female",
            "year":"2019",
            "total":344
          },
          {
            "id":15,
            "subpopulation":"Transgender",
            "year":"2018",
            "total":4
          },
          {
            "id":16,
            "subpopulation":"Transgender",
            "year":"2019",
            "total":2
          },
          {
            "id":17,
            "subpopulation":"Gender Non-Con",
            "year":"2018",
            "total":1
          },
          {
            "id":18,
            "subpopulation":"Gender Non-Con",
            "year":"2019",
            "total":2
          },
          {
            "id":19,
            "subpopulation":"Unknown Gender",
            "year":"2018",
            "total":0
          },
          {
            "id":20,
            "subpopulation":"Unknown Gender",
            "year":"2019",
            "total":0
          },
          {
            "id":21,
            "subpopulation":"White",
            "year":"2018",
            "total":432
          },
          {
            "id":22,
            "subpopulation":"White",
            "year":"2019",
            "total":515
          },
          {
            "id":23,
            "subpopulation":"Native Hawaiian",
            "year":"2018",
            "total":10
          },
          {
            "id":24,
            "subpopulation":"Native Hawaiian",
            "year":"2019",
            "total":9
          },
          {
            "id":25,
            "subpopulation":"Black",
            "year":"2018",
            "total":133
          },
          {
            "id":26,
            "subpopulation":"Black",
            "year":"2019",
            "total":199
          },
          {
            "id":27,
            "subpopulation":"Asian",
            "year":"2018",
            "total":10
          },
          {
            "id":28,
            "subpopulation":"Asian",
            "year":"2019",
            "total":4
          },
          {
            "id":29,
            "subpopulation":"American Indian",
            "year":"2018",
            "total":22
          },
          {
            "id":30,
            "subpopulation":"American Indian",
            "year":"2019",
            "total":12
          },
          {
            "id":31,
            "subpopulation":"Multiple Races",
            "year":"2018",
            "total":24
          },
          {
            "id":32,
            "subpopulation":"Multiple Races",
            "year":"2019",
            "total":27
          },
          {
            "id":33,
            "subpopulation":"Unknown Race",
            "year":"2018",
            "total":0
          },
          {
            "id":34,
            "subpopulation":"Unknown Race",
            "year":"2019",
            "total":0
          },
          {
            "id":35,
            "subpopulation":"Households",
            "year":"2018",
            "total":471
          },
          {
            "id":36,
            "subpopulation":"Households",
            "year":"2019",
            "total":558
          },
          {
            "id":37,
            "subpopulation":"Chronically Homeless",
            "year":"2018",
            "total":87
          },
          {
            "id":38,
            "subpopulation":"Chronically Homeless",
            "year":"2019",
            "total":77
          }
        ];
    }

    componentDidMount(){

    }
    render(){
        console.log("rendering")
        return(
        <div>
            <BarGraph height = {600}
            width = {800}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race'
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}

            />

            <PieGraph height = {500}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Gender'
            />

            <PieGraph height = {500}
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=households'
            />


            <PieChart2 height = {500}
            url = "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/?search=Ethnicity"
            />

            <TableComponent
              data = {this.const_data_for_unsheltered_table}
              year1 = {2018}
              year2 = {2019}
              tableName = "Unsheltered Statistics"
            />

            <TableComponent
              data = {this.const_data_for_sheltered_table}
              year1 = {2018}
              year2 = {2019}
              tableName = "Sheltered Statistics"
            />


        </div>

        )
    }
}
