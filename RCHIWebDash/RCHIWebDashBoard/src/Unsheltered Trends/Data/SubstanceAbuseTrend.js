import React, { Component } from 'react'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar';
import BarChart from '../../components/reformatedCharts/BarChart'
import { barByYearMani } from '../../components/Utilities/ChartDataManipulation/barDataManipulaton'

import { colors } from    '../../components/Utilities/colors'
import {router} from '../../components/Utilities/constants/routing'

//! Rewrite this script

class SubstanceAbuseGraph extends Component {
    constructor(){
        super();
        this.state = {
            barData: null,
        }
    }
    componentDidMount(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query)
            .then(response => {
                this.setState({
                    barData: barByYearMani(response.data, {_typeFilter: "Unsheltered", yearFilter: router.activeYear - 2})
                })
            }) 
    }


    render(){
        return (<div>
            {this.state.barData ? <BarChart {...this.props} data={this.state.barData}  /> : null}
        </div>)
    }
}

export default SubstanceAbuseGraph;