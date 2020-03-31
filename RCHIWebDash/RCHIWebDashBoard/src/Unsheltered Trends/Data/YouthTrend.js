import React, { Component } from 'react'
import axios from 'axios'

// import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'
import LineChart from '../../components/reformatedCharts/LineChart'


import {youthLineMani }  from '../../components/Utilities/ChartDataManipulation/lineDataManipulation'

import {router} from '../../components/Utilities/constants/routing'


class YouthGraph extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
        }
    }

    componentDidMount(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query) 
            .then(response => {
                this.setState({
                    chartData: youthLineMani(response.data, {_typeFilter: "Unsheltered", yearFilter: router.activeYear - 5})
                })
            })
    }

    render(){
        return (<div>
           {this.state.chartData ? <LineChart  {...this.props} data={this.state.chartData}/> : null} 
        </div>)
    }

}

export default YouthGraph;