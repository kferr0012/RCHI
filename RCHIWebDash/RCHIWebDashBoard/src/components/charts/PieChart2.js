import React from 'react';
import truncate from 'truncate-html'
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';
import { pieDataManiInterview } from '../Utilities/ChartDataManipulation/pieDataManipulation'
import {Header} from 'semantic-ui-react';
import { colors } from '../Utilities/styling/colors';

export default class PieChart2 extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            url : this.props.url,
            height : this.props.height,
            mydata : this.props.data,
            footer : this.props.footer,
            margin : this.props.margin,
            position: this.props.position,
            header: this.props.header,
            subHeader: this.props.subHeader,
        }
    }
    componentWillReceiveProps(){
        this.setState({
            url : this.props.url,
            height : this.props.height,
            mydata : this.props.data,
            footer : this.props.footer,
            margin : this.props.margin,
            position: this.props.position,
            header: this.props.header,
            subHeader: this.props.subHeader,
            
        })
    }

    render(){
        return (
            <div style = {{height: this.props.height ? this.props.height : '100%', width: '100%', position: this.state.position ? this.state.position : 'absolute', minWidth: '200px'}}>
                {this.state.header || this.state.subHeader ? <Header size='medium' textAlign='center' style={{marginBottom:0}}>
                    {this.state.header}
                    <Header sub>{this.state.subHeader}</Header>
                </Header> : null}
            
            <ResponsivePie
                data={this.props.data}
                margin={this.props.margin}
                sortByValue={true}
                padAngle={0}
                cornerRadius={3}
                colors={colors[8]}
                borderWidth={1}
                enableRadialLabels = {this.props.enableRadialLabels}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabel={d => this.props.truncate ? truncate(d.id,7) : d.id}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={3}
                radialLabelsLinkHorizontalLength={1}
                radialLabelsLinkStrokeWidth={3}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                legends={this.props.footer? [
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
   
}