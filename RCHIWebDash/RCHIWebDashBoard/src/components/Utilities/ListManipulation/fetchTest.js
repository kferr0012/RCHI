import React, {Component} from 'react'
import {aggregateFetch} from './aggregateFetch'

export default class fetchTest extends Component{

    constructor(){
        super()

        this.state = {
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/", "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"],
            fetchData : []
        }

        console.log("starting aggregate fetch")
        aggregateFetch(this.state.urls)
        console.log("ending aggregate fetch")
        
    }
    
    render(){
        
        return(
            <div>

            </div>
        )
    }
}