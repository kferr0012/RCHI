import React, {Component} from 'react'

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
        console.log("rerendering dashboard ")
        console.log(this.state)

        
        console.log("this is the race table")
        console.log(this.state.Tables["GeneralTableSubpopulations2019"]["Race"])

        const Tables = this.state.Tables

        console.log("filtering race table")
         var newTable = filterList(Tables["GeneralTableSubpopulations2019"]["Race"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])
        // console.log(newTable)
        // var newTable2 = filterList(getTable("GeneralTableSubpopulations2019","Race"), "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])
        // console.log(newTable2)
        console.log("state of race table now")
        console.log(this.state.Tables["GeneralTableSubpopulations2019"]["Race"])
        return(

            <div>
                
                <div style = {{height : 400 , width : 600}}>
                <BarGraph
                    data = {filterList(Tables["GeneralTableSubpopulations2019"]["Gender"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])}
                    indexBy = "subpopulation"
                    keys = {["total"]}        
                    /> 

                <LineGraph/>


                </div>
                <div style = {{height: 400, width: 600}}>
                <PieChart2 height = {200}
                    data = {filterList(Tables["GeneralTableSubpopulations2019"]["Gender"], "subpopulation", ["Total","Unknown Race", "Native Hawaiian", "Asian", "American Indian"])}
                    />
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