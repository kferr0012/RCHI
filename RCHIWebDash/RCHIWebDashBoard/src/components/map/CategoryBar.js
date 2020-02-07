import React, { Component } from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { remove, subset } from '../Utilities/ListManipulation/filter'
import { colors } from '../Utilities/colors'

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
            filterData = subset(rawData, 'city' , curClicked);
        else // else its a district and get by district
            filterData = subset(rawData, 'district' , curClicked.toString() ) 

        var newData = {...keys}; // initializes newData object for sums

        for ( var x = 0; x < filterData.length; x++ ){
            if (!newData[filterData[x].subpopulation]) newData[filterData[x].subpopulation] = 0; // if subpopulation is not in constant adds it
            newData[filterData[x].subpopulation] += (filterData[x].interview + filterData[x].observation); // sums obs and int 
        };
    
        const formatted = Object.keys(newData).map( (x) => {
            return {  // formats data for the nivo bar
                'name': x,
                'total': newData[x],
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
                    keys={['total']}
                    indexBy= {'name'} 
                    margin={{ top: 50, right: 20, bottom: 70, left: 60 }} // right was 130
                    padding={0.1} // so bars are not touching
                    groupMode="grouped"
                    colors={colors[7]}
                    colorBy="index"
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
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                /> 
        </div> );
    }
}