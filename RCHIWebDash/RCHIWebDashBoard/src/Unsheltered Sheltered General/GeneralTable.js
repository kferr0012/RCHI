import React, {Component} from 'react'

import BarGraph from '../components/TestingBranch/BarGraph'
import PieGraph from "../components/charts/PieGraph";
import PieChart2 from "../components/charts/PieChart2"
import TableComponent4 from "../components/charts/TableComponent4"

import fetchTest from '../components/Utilities/ListManipulation/fetchTest'

import Dashboard from '../components/TestingBranch/GeneralDashboard'

export default class GeneralTable extends Component{
    constructor(props){
        super(props)
        console.log("constructor")
    }
    render(){
        console.log("rendering")
        return(

          <div>
            <Dashboard />
          </div>
        )
    }
}
