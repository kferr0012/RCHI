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


        </div>

        )
    }
}
