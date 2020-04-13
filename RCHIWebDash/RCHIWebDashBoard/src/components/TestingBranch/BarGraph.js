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
            mydata : this.props.data,
            legend : this.props.legend,
            margin: this.props.margin,
            axisTitle : this.props.axisTitle,
            tickValues: this.props.tickValues,
            gridYValues: this.props.gridYValues,
            maxValue: this.props.maxValue,
            groupMode: this.props.groupMode,
            height: this.props.height,
            colors: this.props.colors
        }

        //console.log("BarGraph data")
        //console.log(this.props.data)
    }

    componentWillReceiveProps()
    {
        //console.log("willRecieveProps- Bar")

        //console.log("mydata")
        //console.log(this.props.data)
        this.setState({
            index : this.props.indexBy,
            keys : this.props.keys,
            mydata : this.props.data,
            legend : this.props.legend,
            colors: this.props.colors,
            margin: this.props.margin,
            axisTitle : this.props.axisTitle,})
    }

    render(){
        return(
        <div style = {{height: '100%', width: '100%', position:'absolute'}}>
            {/* <div style = {{height: this.props.height ?  this.props.height : "100%", width: '100%'}}> */}
            <ResponsiveBar
            data={this.state.mydata}
            keys={this.state.keys}
            indexBy= {this.state.index}    
            margin={this.props.margin}
            maxValue={this.state.maxValue}
            padding={0.15}
            groupMode={this.state.groupMode}
            colors={ this.state.colors ? this.state.colors : colors[7] }
            colorBy="id"
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
                tickRotation: -12,
                legend: this.props.axisTitle ? this.props.data[0].category : null,
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                tickValues: this.state.tickValues,
                maxValue: this.state.maxValue,
            }}
            gridYValues={this.state.gridYValues}
            labelSkipWidth={0}
            labelSkipHeight={4}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            // labelFormat={d => <tspan y={ -10 }>{ d }</tspan>}
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
