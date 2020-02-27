import React, { Component } from 'react'
import axios from 'axios'

import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'
import {router} from '../../components/Utilities/constants/routing'
class PitCountTrend extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
            currentDistrict:1
        }
    }

    formatingData(){
        console.log("PIT COUNT TREND DATA:")
    
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/CityTotalByYear/?search='+ this.props.query) 
            .then(response => {
                
                console.log("response: ")
                console.log(response)
                const filterData = response.data.filter(index => (index.sheltered === false))

                const formatData = filterData.reduce((accumulator, currentValue) => {
                    if(!accumulator[currentValue.year]){
                        accumulator[currentValue.year] = {'x': currentValue.year,'y': 0}
                    }
                    accumulator[currentValue.year].y += currentValue.total
                    return accumulator;
                }, {})

                const data = Object.keys(formatData).map(key=>{
                    return formatData[key]
                  })

                const completeData= [{"id": "Interviewed","data": data}]



                console.log("completeData: ")
                console.log(completeData)
                this.setState({
                    chartData: completeData,
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
                    <NivoLineChart  height={this.props.height} subHeader={''} header={"PitCountTrend"} data={this.state.chartData}/>
            )
        }
    }

}

export default PitCountTrend;


// axios.get('http://localhost:8000/api/CityTotalByYear/?search=1') 