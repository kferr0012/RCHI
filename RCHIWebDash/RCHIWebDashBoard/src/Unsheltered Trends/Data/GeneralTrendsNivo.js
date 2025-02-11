import React, { Component } from 'react'
import axios from 'axios'
import {router} from '../../components/Utilities/constants/routing'
import LineChart from '../../components/reformatedCharts/LineChart'
import { LineCountInterviewMani } from '../../components/Utilities/ChartDataManipulation/lineDataManipulation'

class GeneralTrends extends Component {
    constructor(props){
        super();
        this.state = {
            chartData:null,
            footnote:null
        }
    }

    componentDidMount(){
        if (this.props.footnote){
            var footnote = this.props.footnote.map((footnote)=><p style={{margin: "0"}}>* {footnote}</p>)
        }
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+this.props.query) 
            .then(response => {
                this.setState({
                    chartData: LineCountInterviewMani(response.data, this.props.lineID, {_typeFilter: "Unsheltered", yearFilter: router.activeYear - 5}),
                    footnote: footnote
                })
            })
    }

    render(){

        return(
            <div>
                {this.state.chartData ? 
                    <LineChart {...this.props} data={this.state.chartData}/>
                    :
                    null
                }
                {this.state.footnote?
                this.state.footnote
                : 
                null
                }
                
            </div>
        )
    }
 
}

export default GeneralTrends;