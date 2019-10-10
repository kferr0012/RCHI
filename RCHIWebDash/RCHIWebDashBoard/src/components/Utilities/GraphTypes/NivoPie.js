import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import {Header} from 'semantic-ui-react'
import { isAbsolute } from 'path'

const NivoResponsivePie = ({data,header, subHeader}) => (
    <div style={{height: '20em'}}>
        <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                {header}
                <Header sub>{subHeader}</Header>
            </Header>
            <ResponsivePie 
        data={data}
        margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.3' ] ] }}
        radialLabel={function(e){return e.id + "\n" +" ("+e.value+")"}}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={4}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTe xtColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        />
    </div>
)

export default NivoResponsivePie