import React, { Component } from 'react'
import axios from 'axios'
import NivoPieChart from '../../Utilities/GraphTypes/NivoPie'

class PieData extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: null,
            currentDistrict:1
        }
    }

    formatingData(){
        axios.get('http://localhost:8000/api/SubpopulationsByCity2019/?search='+this.props.query)
            .then(response => {
                const filterData = response.data.filter(row => (row.subpopulation !== "Total" && row.city !== "RIVERSIDE"))

                const formatData = filterData.reduce((accumulator, currentValue) => {
                    if(!accumulator[currentValue.subpopulation]){
                        accumulator[currentValue.subpopulation] = {"value": 0, "label": currentValue.subpopulation, "id":currentValue.subpopulation}
                    }
                    accumulator[currentValue.subpopulation]["value"] += currentValue.interview + currentValue.observation
                    return accumulator;
                }, {})

                const completeData = Object.keys(formatData).map(key=>{
                    return formatData[key]
                  })

                  this.setState({
                    chartData : completeData,
                    currentDistrict: this.props.clickedDistrict
                  })
            })
    }

    componentDidMount(){
        this.formatingData()
    }

    componentDidUpdate(){
        if(this.props.clickedDistrict){
            if(this.state.chartData && this.props.clickedDistrict !== this.state.currentDistrict){
                this.formatingData()
            }
        }
    }

    render(){
        if(!this.state.chartData){
            return <h1></h1>
        }
        if(this.state.chartData){
            return(
                    <NivoPieChart height = {this.props.height}  subHeader={this.props.subHeader} header={this.props.header} data={this.state.chartData}/>
            )
        }
    }
}

export default PieData