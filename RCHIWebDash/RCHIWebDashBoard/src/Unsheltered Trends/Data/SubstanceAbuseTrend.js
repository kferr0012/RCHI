import React, { Component } from 'react'
import axios from 'axios'

import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'

//! Rewrite this script


class SubstanceAbuseGraph extends Component {
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
        axios.get('http://localhost:8000/api/SubpopulationsByYear/?search='+ this.props.query)
            .then(response => {

                var completeData = []
                const categories = ["Alcohol Abuse", 'Drug Abuse', 'Substance Abuse']

                const filterData = response.data.filter(index => index.sheltered === false 
                    && (index.subpopulation === categories[0] || index.subpopulation === categories[1] || index.subpopulation === categories[2]))
                    for(var i = 0; i< categories.length; i++){
                        const data = filterData.reduce((accumulator, index) => {
                            if(categories[i] === index.subpopulation){
                                accumulator.push({
                                            "x" : index.year,
                                            "y" : index.observation + index.interview
                                        })
                            }
                            return accumulator;
                        }, [])

                        if(categories[i] === 'Substance Abuse'){
                        completeData.push({"id": "Either Or","data": [{"x":2019, "y":498}, ]})
                        }
                        else{
                            completeData.push({"id": categories[i],"data": data})
                        }

                    }

                    console.log("Complete Data: ", completeData)

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