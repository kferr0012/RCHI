import React, { Component } from 'react'
import axios from 'axios'


import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'

class GeneralTrends extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/2020/SubpopulationsByYear/?search='+this.props.query) 
            .then(response => {
                const filterData = response.data.filter(index => (index.sheltered === false))



                const data = filterData.map(index => {
                    return {
                        "x" : index.year,
                        "y" : index.observation + index.interview
                    }
                })

                const completeData= [{"id": "Interviewed","data": data}]

                console.log("=================" + this.props.query + "====================")
                console.log(completeData)
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

export default GeneralTrends;