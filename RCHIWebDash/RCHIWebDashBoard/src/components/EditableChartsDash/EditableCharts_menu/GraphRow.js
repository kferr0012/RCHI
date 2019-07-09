import React, { Component } from 'react';
import ChartChooser from '../ChartChooser';

export default class GraphRow extends Component{

    render(){
        return (
            <div className="row">
                {(this.props.graphs).map((graph,graphIDX)=>(
                  <div className = "col-sm-3" id = "chart">
                    <ChartChooser
                      rowIDX = {this.props.rowIDX}
                      passdIDX= {graphIDX}
                      data={ this.props.graphs[graphIDX].Data}
                      datasets={this.props.datasets}
                      title={this.props.graphs[graphIDX].GraphTitle} 
                      type={this.props.graphs[graphIDX].GraphType}/>
                    <br/>
                  </div>
                ))}
            </div>

        );
    }
}