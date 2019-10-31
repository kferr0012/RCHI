import React, { Component } from 'react'
import axios from 'axios'

import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'

class YouthGraph extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/SubpopulationsByYear/?search='+ this.props.query) 
            .then(response => {

                var completeData = []
                const filterData = response.data.filter(index => index.sheltered === false)

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