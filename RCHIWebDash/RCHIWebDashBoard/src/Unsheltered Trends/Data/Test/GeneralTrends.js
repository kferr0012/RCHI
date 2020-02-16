import React, { Component } from 'react'
import axios from 'axios'
import LineChart from '../../../Utilities/GraphTypes/Line'

class GeneralTrends extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:null, 
            label: props.label,
            chartReference: {}
        }
    }

    componentDidMount(){
        if(this.props.query){
            axios.get('http://localhost:8000/api/2020/SubpopulationsByYear/?search='+this.props.query)  
            .then(response => {
                console.log( "label",this.state.query)
                const filter  = response.data.filter(row => (row.sheltered === false))
                const formatedData = filter.map(row => {
                    return (
                        {
                            title: row.year,
                            count: row.observation + row.interview
                        }
                    )
                })
                
                this.setState({
                    chartData: {
                        labels: formatedData.map( index => index.title),
                        datasets:[
                            {
                                label:this.props.label,
                                data: formatedData.map(index => index.count),
                                backgroundColor:"rgba(15, 125, 197, 100)",
                                borderColor:'rgba(15, 125, 197, 100)',
                                borderWidth:5,
                                fill: false
                            }
                        ]
                    }
                })
            })
            console.log("Reference: ", this.chartReference)
        }
    }

    render(){
        if(!this.state.chartData){
            return <h1>Waiting for data</h1>
        }
        if(this.state.chartData){
            return(
                    <div>
                        <LineChart ref={(reference) => this.chartReference = reference} charData={this.state.chartData} displayLegend={true} title={this.props.title} legendPosition="bottom"/>
                    </div>
            )
        }
    }

}

export default GeneralTrends;