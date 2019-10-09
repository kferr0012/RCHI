import React, { Component } from 'react'
import axios from 'axios'
import LineChart from '../../Utilities/GraphTypes/Line'

class YouthGraph extends Component {
    constructor(){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/SubpopulationsByYear/?search=Youth%20(18-24)') 
            .then(response => {

                const formatedData = response.data.filter(row => row.sheltered === false).map(row => {
                    return (
                        {
                            title: row.year,
                            categories: { 
                                Total: row.interview + row.observation,
                                Interviewed: row.interview,
                                Observed: row.observation
                            }
                        }
                    )
                })


                this.setState({
                    chartData: {
                        labels: formatedData.map( index => index.title),
                        datasets:[
                            {
                                label:'Total',
                                data: formatedData.map(index => index.categories.Total),
                                backgroundColor:'rgba(75,192,192,0.6)',
                                borderWidth:5,
                                fill:false,
                                borderColor:'rgba(75,192,192,0.6)'
                            },
                            {
                                label:'Interviewed',
                                data: formatedData.map(index => index.categories.Interviewed),
                                backgroundColor:'rgba(153,102,255,0.6)',
                                borderWidth:5,
                                fill:false,
                                borderColor:'rgba(153,102,255,0.6)'
                            },
                            {
                                label:'Observed',
                                data: formatedData.map(index => index.categories.Observed),
                                backgroundColor:'rgba(255,159,64,0.6)',
                                borderWidth:5,
                                fill:false,
                                borderColor:'rgba(255,159,64,0.6)'
                            }
                        ]
                    }
                })
            })
    }

    render(){
        if(!this.state.chartData){
            return <h1>Waiting for data</h1>
        }
        if(this.state.chartData){
            return(
                <LineChart charData={this.state.chartData} displayLegend={true} title="Youth (18-24)" legendPosition="bottom"/>
            )
        }
    }

}

export default YouthGraph;