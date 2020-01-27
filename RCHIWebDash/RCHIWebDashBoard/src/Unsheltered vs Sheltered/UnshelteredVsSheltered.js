import React, {Component} from 'react'

import BarGraph from  '../components/TestingBranch/BarGraph'

import {aggregateFetch} from '../components/Utilities/ListManipulation/aggregateFetch'
import fetchTest from '../components/Utilities/ListManipulation/fetchTest'

export default class UnsheleteredVsSheltered extends Component{


    constructor(props){
        super(props)

        this.state = {
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/",
                    "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"],
            Tables : [],
            render : false
        }
        console.log("constructor")
        console.log("finished fetch")
        console.log(this.state)
    }

    async componentDidMount(){
        console.log("didMount")
        var myTables = await aggregateFetch(this.state.urls)
        this.setState({
            Tables: myTables,
            rendered : true
        })
    }

    renderDashboards(){
        console.log("rerendering dashboard ")
        console.log(this.state)

        console.log("this is the race table")
        console.log(this.state.Tables["GeneralTableSubpopulations2019"]["Race"])
        return(
            <div>
                <div style = {{height : 400 , width : 600}}>
                    <BarGraph
                        data = {this.state.Tables["GeneralTableSubpopulations2019"]["Race"]}
                        indexBy = "subpopulation"
                        keys = {["interview", "observation"]}        
                    /> 
                </div>
                <BarGraph height = {600} 
                    width = {800} 
                    url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race'
                    indexBy = "subpopulation"
                    keys = {["interview", "observation"]}        
                /> 
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