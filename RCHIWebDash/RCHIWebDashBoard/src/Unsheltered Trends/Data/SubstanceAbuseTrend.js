import React, { Component } from 'react'
import axios from 'axios'

import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'
import {router} from '../../components/Utilities/constants/routing'
//! Rewrite this script


class SubstanceAbuseGraph extends Component {
    constructor(){
        super();
        this.state = {
            chartData:null
        }
    }


    collectData = (category , data) => {

            return data
                .filter(i => i.subpopulation === category)
                    .map(j => {
                        return {
                            x : j.year,
                            y : j.total
                        }
                    })
        }


    componentDidMount(){

        console.log("SUBSTANCE ABUSE TREND: ")
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query)
            .then(response => {

                var completeData = []

                const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 5)
                const categories = ['Alcohol Abuse', 'Drug Abuse', 'Substance Abuse']
                console.log("[RESPONSE DATA]: ", filterData)

                for(var i =0 ; i<categories.length; i++){
                    if(categories[i] === "Substance Abuse"){
                        completeData.push({id: "Either Or", data: this.collectData(categories[i], filterData)})
                    }
                    else{
                        completeData.push({id: categories[i] , data: this.collectData(categories[i], filterData)})
                    }
                }                
                this.setState({
                    chartData: completeData
                })
            }) 
    }


    render(){
        if(!this.state.chartData){
            return <h1>Waiting for data</h1>
        }
        if(this.state.chartData){
            return(
                <NivoLineChart  subHeader={this.props.subHeader} header={this.props.header} data={this.state.chartData}/>
            )
        }
    }
}

export default SubstanceAbuseGraph;