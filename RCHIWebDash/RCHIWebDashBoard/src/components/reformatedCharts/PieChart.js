import React,  {useState} from 'react';
import {ResponsivePie} from "@nivo/pie";
import {Header} from 'semantic-ui-react'

import { colors } from '../Utilities/styling/colors';

const PieChart = props => {
    let {data, margin,sortByValue, innerRadius, padAngle, cornerRadius ,legends, divHeight, header, subHeader} = props
    
    return (
        <div style ={{height:divHeight, width: '100%'}}>
            <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                {header}
                <Header sub >{subHeader}</Header>
            </Header>
            <ResponsivePie
                data={data}
                margin={margin}
                sortByValue={sortByValue}
                innerRadius={innerRadius ? innerRadius : 0}
                padAngle={padAngle ? padAngle : 0}
                cornerRadius={cornerRadius ? cornerRadius : 0}
                colors={colors[8]}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={12}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={1}
                radialLabelsLinkHorizontalLength={1}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}

                legends={legends ? [
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ] : []}
            />
        </div>
    )
}

export default PieChart