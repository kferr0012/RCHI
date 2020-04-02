import React, {Component} from 'react'
import {aggregateFetch} from './aggregateFetch'

export default class fetchTest extends Component{

    constructor(){
        super()

        this.state = {
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/", "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"],
            fetchData : []
        }

        aggregateFetch(this.state.urls)
        
    }
    
    render(){
        
        return(
            <div>

            </div>
        )
    }
}