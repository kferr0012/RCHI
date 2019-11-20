import React, {Component} from 'react'

import BarGraph from  '../components/TestingBranch/BarGraph'
export default class UnsheleteredVsSheltered extends Component{


    constructor(props){
        super(props)
    }

    render(){

        return(
            <div>
            <BarGraph height = {600} 
                width = {800} 
                url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Age'
                indexBy = "subpopulation"
                keys = {["interview", "observation"]}        
            /> 
            
            <BarGraph height = {600} 
                width = {800} 
                url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race'
                indexBy = "subpopulation"
                keys = {["interview", "observation"]}        
            /> 
            </div>
            
        )

    }
}