import React, { Component } from 'react'
import axios from 'axios'
import {router} from '../../components/Utilities/constants/routing'
import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'

class GeneralTrends extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+this.props.query) 
            .then(response => {
                const filterData = response.data.filter(index => (index.sheltered === false && index.year > router.activeYear - 5))

                console.log("[filtered Data:]: ", filterData)

                const data = filterData.map(index => {
                    return {
                        "x" : index.year,
                        "y" : index.observation + index.interview
                    }
                })

                const completeData= [{"id": "Interviewed","data": data}]
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
                    <NivoLineChart  subHeader={this.props.subHeader} header={this.props.header} data={this.state.chartData} legend={this.props.legend}/>
            )
        }
    }

}

export default GeneralTrends;