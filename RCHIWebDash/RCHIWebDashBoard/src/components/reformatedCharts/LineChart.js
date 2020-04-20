import { ResponsiveLine } from '@nivo/line'
import {Header} from 'semantic-ui-react'
import React from 'react'

// import { colors } from '../colors';
const LineChart = props => {

    let {slice ,stacked, header , subHeader , divHeight, margin, tickValues , gridYValues, maxValue, data , legend ,colors} = props

    return(
        <div style={{height:divHeight ? divHeight : "100%", width: '100%'}}>
            <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                {header}
                <Header sub >{subHeader}</Header>
            </Header>
            <ResponsiveLine
                data={data}
                margin={margin}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', stacked: stacked ? stacked : false, min: 0, max: maxValue}}
                enableSlices = "x"
                sliceTooltip={({ slice }) => {
                    return (
                        <div
                            style={{
                                background: 'white',
                                padding: '9px 12px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <div><strong>Year:</strong> {slice.points[0].data.x}</div>
                            {slice.points.map(point => (
                                <div
                                    key={point.id}
                                    style={{
                                        color: point.serieColor,
                                        padding: '3px 0',
                                    }}
                                >
                                    <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                                </div>
                            ))}
                        </div>
                    )}}

                axisTop={null}
                axisRight={null} 
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={slice ? null :{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    tickValues: tickValues,

                }}
                gridYValues={gridYValues}
                colors={colors}
                lineWidth={4}
                pointSize={10}
                enablePointLabel={true}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends= {legend ? [
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 41,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 10,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ] : []}

                />
        </div>
)}

export default LineChart