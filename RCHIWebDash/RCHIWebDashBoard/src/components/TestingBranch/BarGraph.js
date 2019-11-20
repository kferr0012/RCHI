import React, {Component} from 'react'
import {Text} from 'react'
import { ResponsiveBar } from '@nivo/bar';

export default class BarGraph extends Component{
    constructor(props){
        super(props)

        this.state = {
            url : this.props.url,
            index : this.props.indexBy,
            keys : this.props.keys,
            height : this.props.height,
            width : this.props.width,
            mydata : []

        }

        this.runBar = this.runBar.bind(this)

    }
    async fetchData(){
        var self = this
        console.log("fetching in " + this.state.url)
        await fetch('http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/?category=Race/', {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then((data) =>{
            console.log("data found")
            self.setState({mydata:data})
        })
        .catch(err => {
            console.log("no data found")
        })
        
        this.setState({dataUpdated : true})
    }

    async componentWillReceiveProps(){
        this.setState({url : this.props.url})
        await this.fetchData()
    }
    async componentWillMount(){
        await this.fetchData()
    }

    runBar(){

        return(
            <ResponsiveBar
            data={this.state.mydata}
            keys={this.state.keys}
            indexBy= {this.state.index} 
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0}
            groupMode="grouped"
            colors={{ scheme: 'nivo' }}
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
                legend: 'Race',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Count',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
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
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        /> 
        )
    }

    render(){
        return(
        <div style = {{height: this.state.height , width: this.state.width}}>
            {this.state.mydata ? this.runBar(): null}

        </div>
        )
    }
}