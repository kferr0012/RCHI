import { ResponsiveLine } from '@nivo/line'
import {Header} from 'semantic-ui-react'
import React from 'react'

const ResponsiveNivoLine = ({ data,header,subHeader}) => {
    return(
        <div style={{height: '20em'}}>

            <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                {header}
                <Header sub >{subHeader}</Header>
            </Header>
            <ResponsiveLine
                data={data}
                margin={{ top: 40, right: 20, bottom: 80, left: 30 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', stacked: true, min: 0, max: 'auto'}}
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
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'category10' }}
                lineWidth={4}
                pointSize={10}
                enablePointLabel={true}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
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
                ]}
                />
        </div>
)}

export default ResponsiveNivoLine