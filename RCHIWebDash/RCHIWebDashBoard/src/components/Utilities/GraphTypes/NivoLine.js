import { ResponsiveLine } from '@nivo/line'
import {Header} from 'semantic-ui-react'
import React from 'react'

const ResponsiveNivoLine = ({ data,header,subHeader}) => {
    return(
        <div style={{height: '20em'}}>

            <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                {header}
                <Header sub>{subHeader}</Header>
            </Header>
            <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 15, bottom: 60, left: 30 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto'}}
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
                colors={"#0067cc"}
                lineWidth={4}
                pointSize={10}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                />
        </div>
)}

export default ResponsiveNivoLine