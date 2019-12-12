import React, { Component } from 'react';
import {Text} from 'react'
import { ResponsiveBar } from '@nivo/bar';
//import bar graph component
const data = [
    {"id":1,"district":"5","city":"BANNING","category":"Race","subpopulation":"American Indian","interview":100,"observation":0},
    {"id":1,"district":"5","city":"BANNING","category":"Race","subpopulation":"Asian","interview":2,"observation":0},
    {"id":1,"district":"5","city":"BANNING","category":"Race","subpopulation":"White","interview":100, "observation":0},
    {"id":1,"district":"5","city":"BANNING","category":"Race","subpopulation":"American Indian","interview":2,"observation":0}
]
const theme = {
    axis: {
      textColor: '#eee',
      fontSize: '34px',
      tickColor: '#eee',
    },
    grid: {
      stroke: '#888',
      strokeWidth: 1
    },
  };
export default class Sandbox extends Component {

    constructor(props){
        console.log("starting")
        super(props)
        this.state = {
            mydata : ""
        }
        
        this.runBar = this.runBar.bind(this)
    }

    async componentDidMount(){

        var self = this
        await fetch('http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race', {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then((data) =>{
            this.setState({mydata:data})
        })
        .catch(err => {
            console.log("no data found")
        })
        
        console.log("data:")
        console.log(this.state.mydata)

        //delete this.state.mydate["id"]
        console.log("now:")
        console.log(this.state.mydata[263])
        this.setState({dataUpdated : true})
    }

    async refresh(){
        var self = this
        await fetch('http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Race', {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then((data) =>{
            this.setState({mydata:data})
        })
        .catch(err => {
            console.log("no data found")
        })
    }
    runBar(){

        console.log(this.state.mydata)
        return(
            <ResponsiveBar
            data={this.state.mydata}
            keys={["interview", "observation"]}
            indexBy= "subpopulation" 
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0}
            groupMode="grouped"
            theme={theme}
            // colors={{ scheme: 'nivo' }}
            colors={['rgba(125, 114, 140, 0.53)','rgba(119, 63, 191, 0.38)']}
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
                tickSize: 2,
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
                legendOffset: -40,
                legends: {
                    text: {
                        fontSize: 100,
                    }
                }
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 7] ] }}
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

        console.log("rerender")
        console.log(data)
        return(
        <div style = {{height: 500 , width: 300}}>
            This is an example text
            {this.state.mydata ? this.runBar(): null}
            <button onClick={this.refresh}>click me </button>
        </div>
    )
    }
}
