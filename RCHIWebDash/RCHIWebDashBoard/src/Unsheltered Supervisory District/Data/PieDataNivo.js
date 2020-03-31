import React, { Component } from 'react'
import axios from 'axios'
import {router} from '../../components/Utilities/constants/routing'
import { pieDataManiInterview } from '../../components/Utilities/ChartDataManipulation/pieDataManipulation'
import PieChart from '../../components/reformatedCharts/PieChart'

import NivoPieChart from '../../components/Utilities/GraphTypes/NivoPie'

class PieData extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: null,
            currentDistrict:1
        }
    }

    formatingData(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByCity/?search='+this.props.query)
            .then(response => {
                const filterData = response.data.filter(row => (row.subpopulation !== "Total" && row.city !== "RIVERSIDE"))

                const newDataObject = filterData.reduce((acc,val) => {

                    let {subpopulation, interview, observation, total} = val

                    if(!acc[subpopulation]){
                        acc[subpopulation] = {interview:0, observation:0, total:0}
                    }
                    acc[subpopulation].interview += interview
                    acc[subpopulation].observation += observation
                    acc[subpopulation].total += total
                    return acc
                }, {})

                const newDataArray = Object.entries(newDataObject).map(([key,value]) => {
                    return{
                        subpopulation:key,
                        ...value
                    }
                })

                  this.setState({
                    chartData : pieDataManiInterview(newDataArray),
                    currentDistrict: this.props.clickedDistrict
                  })
            })
    }

    async componentDidMount(){
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
        return <div>
            {this.state.chartData ? <PieChart {...this.props} data={this.state.chartData}/> :  null}
        </div>
    }
}

export default PieData