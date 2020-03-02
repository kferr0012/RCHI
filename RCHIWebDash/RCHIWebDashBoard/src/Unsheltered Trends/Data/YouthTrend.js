import React, { Component } from 'react'
import axios from 'axios'

import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'

import {router} from '../../components/Utilities/constants/routing'


class YouthGraph extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query) 
            .then(response => {

                var completeData = []
                const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 5)

                const categories = ['Total', 'Interviewed', 'Observed']

                for(let i = 0; i< categories.length; i++){
                    const data = filterData.map(index => {
                        if(categories[i] === 'Total'){
                            return {
                                "x" : index.year,
                                "y" : index.observation + index.interview
                            }
                        }
                        else if(categories[i] === 'Interviewed'){
                            return {
                                "x" : index.year,
                                "y" : index.interview
                            }
                        }
                        else if(categories[i] === 'Observed'){
                            return {
                                "x" : index.year,
                                "y" : index.observation
                            }
                        }

                    })

                    completeData.push({"id": categories[i],"data": data})
                }

                console.log("Complete Data: ", completeData)

                this.setState({
                    chartData: completeData
                })
            })
    }

    render(){
        if(!this.state.chartData){
            return <h1></h1>
        }
        if(this.state.chartData){
            return(
                    <NivoLineChart  subHeader={this.props.subHeader} header={this.props.header} data={this.state.chartData}/>
            )
        }
    }

}

export default YouthGraph;