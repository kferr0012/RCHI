import React, { Component } from 'react'

import {Pie} from 'react-chartjs-2'



class PieGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            charData: props.charData
        }
    }
    
    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right',
        title:''
    }


    render(){
        return(
                <Pie
                    data={this.state.charData}
                    options={{
                        title: {
                            display:this.props.displayTitle,
                            text: this.props.title,
                            fontSize:15
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        },
                        maintainAspectRatio:false
                    }}
                />
        )
    }
}

export default PieGraph;
