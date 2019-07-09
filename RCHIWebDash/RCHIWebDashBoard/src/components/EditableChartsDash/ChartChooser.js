import React, { Component } from 'react';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';

export default class ChartChooser extends Component{
    render(){
        if (this.props.type === "Line")
        return(
            <div>
                <LineChart 
                datasets = {this.props.datasets}
                data ={this.props.data}
                title={this.props.title}
                graphIDX = {this.props.passdIDX}
                rowIDX = {this.props.rowIDX}
                />
                {/* <p>{this.props.data}</p> */}
            </div>
        );
        else if (this.props.type === "Bar")
        return(
            <div>
                <BarChart 
                datasets = {this.props.datasets}
                data ={this.props.data}
                title={this.props.title}
                graphIDX = {this.props.passdIDX}
                rowIDX = {this.props.rowIDX}
                />
                {/* <p>{this.props.data}</p> */}
            </div>
        );

        return(<p>{this.props.type}</p>)
    }
}