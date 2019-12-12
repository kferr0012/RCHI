import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

export default class PieGraph extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            url : this.props.url,
            height : this.props.height,
            width : this.props.width,
            mydata : []
        }

        this.runPie = this.runPie.bind(this)
    }



    async fetchData(){

        var self = this
        await fetch(this.state.url, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then((data) =>{
                this.setState({mydata:data})
            })
            .catch(err => {
                console.log("no data found")
            })

        console.log("data:")
        console.log(this.state.mydata)





    }

    async componentWillReceiveProps(){
        this.setState({url : this.props.url})
        await this.fetchData()
    }
    async componentWillMount(){
        await this.fetchData()
    }

    runPie(){

        let i;
        let totalValues = this.state.mydata;
        for (i = 0; i < this.state.mydata.length - 1; i++) {
            if(this.state.mydata[i].subpopulation === 'Total'){
                delete this.state.mydata[i];
            }
   
            this.state.mydata[i].value = this.state.mydata[i].interview + this.state.mydata[i].observation
            this.state.mydata[i].id = this.state.mydata[i].subpopulation
            this.state.mydata[i].label = this.state.mydata[i].subpopulation
            delete this.state.mydata[i].subpopulation;

        }

        console.log(this.state.mydata)



        return (
            <ResponsivePie
                data={this.state.mydata}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
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
                legends={[
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
                ]}
            />
        )
    }
    render() {
        return (
            <div style = {{height: this.state.height, width: this.state.width}}>
                {this.state.mydata ? this.runPie(): null}
            </div>

        )
    }
}
