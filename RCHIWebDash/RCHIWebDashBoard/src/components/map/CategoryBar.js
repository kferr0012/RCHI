import React, { Component } from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { remove, get } from '../Utilities/ListManipulation/filter'

export default class CategoryBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: null, // data for chart
            curClicked: this.props.curClicked, // bad practice, but useful for keeping in sync with dom
        }
    }

    componentWillMount(){
        this.filterData();
    }

    filterData = () => {
        var filterData = [];
        const { curClicked, rawData, keys} = this.props;

        if (curClicked === 0 ) // if 0 sum up entire county
            filterData = rawData;
        else if (curClicked.length > 1) // if longer then a digit, its a city and sort based on name
            filterData = get(rawData, 'city' , curClicked);
        else // else its a district and get by district
            filterData = get(rawData, 'district' , curClicked.toString() ) 

        var newData = {...keys}; // initializes newData object for sums

        for ( var x = 0; x < filterData.length; x++ ){
            if (!newData[filterData[x].subpopulation]) newData[filterData[x].subpopulation] = 0; // if subpopulation is not in constant adds it
            newData[filterData[x].subpopulation] += (filterData[x].interview + filterData[x].observation); // sums obs and int 
        };
    
        const formatted = Object.keys(newData).map( (x) => {
            return {  // formats data for the nivo bar
                'name': x,
                'data': newData[x],
            }
        });

        this.setState({
            chartData: formatted,
            curClicked: curClicked,
        })
    }

    render(){
        const { category } = this.props;
        if (this.state.curClicked !== this.props.curClicked){ // if out of sync with dom, re gets data to display, triggering a rerender
            this.filterData();
        }
        return ( // if data has not been received, return loader
            <div style={{position:'absolute', width:'100%', height: '100%'}}>
                <ResponsiveBar
                    data={this.state.chartData}
                    keys={['data']}
                    indexBy= {'name'} 
                    margin={{ top: 50, right: 20, bottom: 70, left: 60 }} // right was 130
                    padding={0.1} // so bars are not touching
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
                            spacing: 12
                        }
                    ]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: -12,
                        legend: category,
                        legendPosition: 'middle',
                        legendOffset: 53,
                        // renderTick: ({ textAnchor, textBaseline, value, x, y }) => {
                        //     const MAX_LINE_LENGTH = 10;
                        //     const MAX_LINES = 2;
                        //     const LENGTH_OF_ELLIPSIS = 3;
                        //     const TRIM_LENGTH = MAX_LINE_LENGTH * MAX_LINES - LENGTH_OF_ELLIPSIS;
                        //     const trimWordsOverLength = new RegExp(`^(.{${TRIM_LENGTH}}[^\\w]*).*`);
                        //     const groupWordsByLength = new RegExp(
                        //     `([^\\s].{0,${MAX_LINE_LENGTH}}(?=[\\s\\W]|$))`,
                        //     'gm',
                        //     );
                        //     const splitValues = value
                        //     .replace(trimWordsOverLength, '$1...')
                        //     .match(groupWordsByLength)
                        //     .slice(0, 2)
                        //     .map((val, i) => (
                        //         <tspan
                        //         key={val}
                        //         dy={12 * i}
                        //         x={-10}
                        //         style={{ fontFamily: 'sans-serif', fontSize: '11px' }}
                        //         >
                        //         {val}
                        //         </tspan>
                        //     ));
                        //     return (
                        //     <g transform={`translate(${x+5},${y+10})`} rotate={"rotate(-10)"}>
                        //         <text alignmentBaseline={textBaseline} textAnchor={textAnchor}>
                        //         {splitValues}
                        //         </text>
                        //     </g>
                        //     );
                        // }
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Count',
                        legendPosition: 'middle',
                        legendOffset: -45
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    // legends={[ // i didnt like the legend
                    //     {
                    //         dataFrom: 'keys',
                    //         anchor: 'bottom-right',
                    //         direction: 'column',
                    //         justify: false,
                    //         translateX: 120,
                    //         translateY: 0,
                    //         itemsSpacing: 2,
                    //         itemWidth: 100,
                    //         itemHeight: 20,
                    //         itemDirection: 'left-to-right',
                    //         itemOpacity: 0.85,
                    //         symbolSize: 20,
                    //         effects: [
                    //             {
                    //                 on: 'hover',
                    //                 style: {
                    //                     itemOpacity: 1
                    //                 }
                    //             }
                    //         ]
                    //     }
                    // ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                /> 
        </div> );
    }
}