import React, { Component } from 'react'

import axios from 'axios'
// import LineChart from '../../Utilities/GraphTypes/Line'
import NivoLineChar from '../../../Utilities/GraphTypes/NivoLine'

class VeteranGraph extends Component {
    constructor(){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/SubpopulationsByYear/?search=Veteran') 
            .then(response => {
                const filterData = response.data.filter(index => (index.sheltered === false))
                const data = filterData.map(index => {
                    return {
                        "x" : index.year,
                        "y" : index.observation + index.interview
                    }
                })

                const completeData= [
                    {
                        "id": "Interviewed",
                        "data": data
                    }
                ]
                


                this.setState({
                    chartData: completeData
                })







                // const filter  = response.data.filter(row => (row.sheltered === false))
                // const formatedData = filter.map(row => {
                //     return (
                //         {
                //             title: row.year,
                //             count: row.observation + row.interview
                //         }
                //     )
                // })
                // this.setState({
                //     chartData: {
                //         labels: formatedData.map( index => index.title),
                //         datasets:[
                //             {
                //                 label:'Interviewed',
                //                 data: formatedData.map(index => index.count),
                //                 backgroundColor:[
                //                     'rgba(75,192,192,0.6)',
                //                 ],
                //                 borderWidth:5
                //             }
                //         ]
                //     }
                // })
            })
    }

    render(){
        if(!this.state.chartData){
            return <h1>Waiting for data</h1>
        }
        if(this.state.chartData){
            return(
                // <LineChart charData={this.state.chartData} displayLegend={true} title="Veterans" legendPosition="bottom"/>

                <div style={{height: 200}}>
                    <NivoLineChar data={this.state.chartData}/>
                </div>
            )
        }
    }

}

export default VeteranGraph;