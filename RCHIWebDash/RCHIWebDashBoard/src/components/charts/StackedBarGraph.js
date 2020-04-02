import React, {Component} from 'react'
import {Text} from 'react'
import { colors } from "../Utilities/colors"
import { ResponsiveBar } from '@nivo/bar';

export default class BarGraph extends Component{
    constructor(props){
        super(props)

        
        this.state = {
            index : this.props.indexBy,
            keys : this.props.keys,
            mydata1 : this.props.data1,
            mdata2 : this.props.data2,
            legend : this.props.legend,
            margin: this.props.margin,
            axisTitle : this.props.axisTitle,
        }
    }

    componentWillReceiveProps()
    {
        console.log(this.props.data)
        this.setState({
            index : this.props.indexBy,
            keys : this.props.keys,
            mydata1 : this.props.data1,
            mdata2 : this.props.data2,
            legend : this.props.legend,
            margin: this.props.margin,
            axisTitle : this.props.axisTitle,})
    }

    render(){
        return(
        <div style = {{height: '100%', width: '100%', position:'absolute'}}>
            <ResponsiveBar
            data={this.state.mydata}
            keys={this.state.keys}
            indexBy= {this.state.index}    
            margin={this.props.margin}
            padding={0.15}
            groupMode="grouped"
            colors={ colors[7] }
            colorBy="index"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: this.props.axisTitle ? this.props.data[0].category : null,
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={this.props.legend ? [
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ] : []}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
         
    </div>
        )
    }
}
