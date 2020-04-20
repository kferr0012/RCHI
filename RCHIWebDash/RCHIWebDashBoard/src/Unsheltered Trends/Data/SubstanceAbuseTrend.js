import React, { Component } from 'react'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar';
import BarChart from '../../components/reformatedCharts/BarChart'
import { barByYearMani } from '../../components/Utilities/ChartDataManipulation/barDataManipulaton'

import { colors } from    '../../components/Utilities/styling/colors'
import {router} from '../../components/Utilities/constants/routing'

//! Rewrite this script

class SubstanceAbuseGraph extends Component {
    constructor(){
        super();
        this.state = {
            barData: null,
            footnote: null
        }
    }
    componentDidMount(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query)
            .then(response => {
                this.setState({
                    barData: barByYearMani(response.data, {_typeFilter: "Unsheltered", yearFilter: router.activeYear - 2}),
                    footnote: this.props.footnote
                })
            }) 
    }


    render(){
        return (<div>
            {this.state.barData ? <BarChart {...this.props} data={this.state.barData}  /> : null}
            { this.state.footnote  ? 
                <p>* {this.state.footnote}</p>
                :
                null    
             }
        </div>)
    }
}

export default SubstanceAbuseGraph;