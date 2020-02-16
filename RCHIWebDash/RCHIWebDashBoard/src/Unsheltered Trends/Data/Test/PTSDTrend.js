import React, { Component } from 'react'

import axios from 'axios'
import LineChart from '../Utilities/GraphTypes/Line'

class PTSDGraph extends Component {
    constructor(){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/2020/SubpopulationsByYear/?search=PTSD') 
            .then(response => {
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
                        labels: formatedData.map( label => label.title),
                        datasets:[
                            {
                                label:'Interviewed',
                                data: formatedData.map(label => label.count),
                                backgroundColor:[
                                    'rgba(30, 139, 195, 1)',
                                ],
                                fill:false,
                                borderColor:'rgba(30, 139, 195, 1)',
                                borderWidth:5
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
                <LineChart charData={this.state.chartData} displayLegend={true} title="PTSD" legendPosition="bottom"/>
            )
        }
    }

}

export default PTSDGraph;