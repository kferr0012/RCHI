import React, { Component } from 'react'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar';

import { colors } from    '../../components/Utilities/colors'
import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'
import {router} from '../../components/Utilities/constants/routing'
import { combine } from '../../components/Utilities/ListManipulation/combine';
import { List } from 'semantic-ui-react';
//! Rewrite this script

class SubstanceAbuseGraph extends Component {
    constructor(){
        super();
        this.state = {
            barData: null,
            keys: null
        }
    }
    
    collectData = (year , data) => {
            // for stacked bar graph totals
            var dataSameYear = data.filter(i => i.year === year)
            
            var combinedData = {"Year": year ,"Either Or": 0, "Drug Abuse": 0, "Alcohol Abuse": 0, "Interviewed": 0}

            for (var i = 0; i < dataSameYear.length; i++){
                if (dataSameYear[i].subpopulation === "Drug Abuse") {
                    combinedData["Drug Abuse"] = dataSameYear[i].total
                    combinedData["Interviewed"] += dataSameYear[i].total
                }
                else if (dataSameYear[i].subpopulation === "Alcohol Abuse"){
                    combinedData["Alcohol Abuse"] = dataSameYear[i].total;
                    combinedData["Interviewed"] += dataSameYear[i].total
                }
                else {
                    combinedData["Either Or"] = dataSameYear[i].total
                    combinedData["Interviewed"] += dataSameYear[i].total
                    return combinedData
                }
            }
           
            return combinedData
          
        }


    componentDidMount(){

        console.log("SUBSTANCE ABUSE TREND: ")
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query)
            .then(response => {

                var BarData = []
                // get years that we want
                var years = this.props.years
                // categories for substance abuse subpopulation
                const categories = ['Alcohol Abuse', 'Drug Abuse', 'Substance Abuse']
                const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 5 && categories.includes(index.subpopulation))
                console.log("[RESPONSE DATA]: ", filterData);

                for (var i = 0; i < years.length; i++){
                    BarData.push(this.collectData(years[i],filterData))
                }
                
                // specified keys for the bar graph
                var keys = this.props.keys
                this.setState({
                    barData: BarData,
                    keys: keys
                })
                
            }) 
    }


    render(){
       

        if(!this.state.barData){
            return <h1>Waiting for data</h1>
        }
        if(this.state.barData){
            return(
               
                 <div>
                    <div class="ui medium center aligned header" style={{marginBottom: "0px"}}>
                        {this.props.header}
                     <div class="ui sub header">{this.props.subHeader}</div>
                </div>
         
                <div style={{position:'relative', width:'100%', height: '250px'} }>
                    <ResponsiveBar
                        data={this.state.barData}
                        keys={this.state.keys}
                        indexBy='Year'
                        margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
                        padding={0.3}
                        colors={colors[7]}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Year',
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
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                symbolShape: 'circle',
                                translateX: 0,
                                translateY: 60,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 12,
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
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                       
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        />
                
               
                </div>
            </div>

            )
        }
    }
}

export default SubstanceAbuseGraph;