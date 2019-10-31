import React, { Component } from 'react'
import axios from 'axios'
import LineChart from '../../../Utilities/GraphTypes/Line'

class ThreeVariableTrend extends Component{
    constructor(){
        super();
        this.state = {
            chartData:null
        }
    }

    collectData = (sheltered, category, data) => {
        return data
        .filter( row => row.sheltered === sheltered && row.subpopulation === category)
            .map(row => {return{
                title: row.year,
                count: row.interview + row.observation
            }})
    }

    typeSelected = (sheltered,category,data) => {
        const formatedData = data.filter(index => index.sheltered === sheltered && index.subpopulation === category)
        const newData = [
            {year: 2015, count: 0}, {year: 2016, count:0},{year: 2017, count:0},{year: 2018, count:0},{year: 2019, count:0}
        ]

        var i=0,j =0
        while(i < formatedData.length && j < newData.length){
            if(formatedData[i].year === newData[j].year){
                newData[j].count = formatedData[i].interview + formatedData[i].observation
                i++; j++;
            }
            else{
                j++
            }
        }


        return newData
        
        // return data
        //     .filter(index => index.sheltered === sheltered && index.subpopulation === category)
        //         .map(index => index.interview + index.observation)
    }


    componentDidMount(){
        axios.get('http://localhost:8000/api/SubpopulationsByYear/?search=Subpopulations')
            .then(response => {

            const labels = Array.from(new Set(response.data.map( input => input.year)))
                this.setState({
                    chartData: {
                        labels: labels.map(label => label),
                        datasets:[
                            {
                                label:'Alcohol Abuse',
                                data: this.typeSelected(false,"Alcohol Abuse", response.data).map( i => i.count),
                                backgroundColor:'rgba(75,192,192,0.6)',
                                borderWidth:5,
                                fill:false,
                                borderColor:'rgba(75,192,192,0.6)'
                            },
                            {
                                label:'Drug Abuse',
                                data: this.typeSelected(false,"Drug Abuse", response.data).map( i => i.count),
                                backgroundColor:'rgba(153,102,255,0.6)',
                                borderWidth:5,
                                fill:false,
                                borderColor:'rgba(153,102,255,0.6)'
                            },
                            {
                                label:'Either Or',
                                data: this.typeSelected(false,"Substance Abuse", response.data).map( i => i.count),
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
                <LineChart charData={this.state.chartData} displayLegend={true} title="Substance Abuse" legendPosition="bottom"/>
            )
        }
    }
}

export default ThreeVariableTrend;