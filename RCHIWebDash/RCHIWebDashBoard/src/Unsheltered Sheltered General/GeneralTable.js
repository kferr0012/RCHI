import React, {Component} from 'react'

import BarGraph from '../components/TestingBranch/BarGraph'

export default class GeneralTable extends Component{
    constructor(props){
        super(props)


    }

    componentDidMount(){
        
    }
    render(){
        console.log("rendering")
        return(
        <div>
            <Layout>
            <BarGraph height = {600} 
            width = {800} 
            url = 'http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race'
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}
            
            /> 
           
            <LineGraph
            />

            <Table
            
            />
            </Layout>
        </div>

        )
    }
}