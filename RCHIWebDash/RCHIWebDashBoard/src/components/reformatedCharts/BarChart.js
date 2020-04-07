import React, {Component} from 'react'
import {Text} from 'react'
import { colors } from "../Utilities/colors"
import { ResponsiveBar } from '@nivo/bar';
import {Header} from 'semantic-ui-react'

const BarChart = props => {

    let {labelSkipHeight,header, subHeader ,data, indexBy, keys, legend, margin, axisTitle, tickValues, gridYValues, maxValue, groupMode, divHeight, padding} = props

    return(
        <div style = {{height: divHeight ?  divHeight: divHeight, width: '100%'}}>
            <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                {header}
                <Header sub >{subHeader}</Header>
            </Header>

<ResponsiveBar
        data={data}
        keys={keys}
        indexBy= {indexBy} 
        margin={margin}
        maxValue={maxValue}
        padding={padding ? padding : 0.15}
        groupMode={groupMode}
        colors={ colors[7] }
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
            legend: axisTitle ? this.props.data[0].category : null,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: tickValues,
            maxValue: maxValue,
        }}
        gridYValues={gridYValues}
        labelSkipWidth={0}
        labelSkipHeight={labelSkipHeight ? labelSkipHeight : 4}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={legend ? [
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

export default BarChart;