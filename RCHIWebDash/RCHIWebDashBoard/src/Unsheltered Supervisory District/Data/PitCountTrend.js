import React, { Component } from 'react'
import axios from 'axios'

import LineChart from '../../components/reformatedCharts/LineChart'
import { pitCountTrendMani } from '../../components/Utilities/ChartDataManipulation/lineDataManipulation'
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
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/CityTotalByYear/?search='+ this.props.query) 
            .then(response => {
                
                const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 5 && index.city !== "Riverside")
                const completeData = pitCountTrendMani(filterData, "District " +  this.props.clickedDistrict)
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
        return (
            <div>
                {this.state.chartData ? <LineChart {...this.props} data={this.state.chartData}/> : null}
            </div>
        )
    }
}

export default PitCountTrend;
