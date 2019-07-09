import React, { Component } from "react";
import '../Menu.css';
import GraphForm from "./GraphForm.js";

export default class Menu extends Component {
    onChange = (newVal,rowIDX,graphIDX) => {
        console.log(graphIDX);
        this.props.onChange(newVal,rowIDX,graphIDX);
    };
    render() {
        return (
        <div>
            <br/>
            <h3>{"Row " + this.props.rowIDX}
            </h3>
            <button
                type="button"
                onClick={() => this.props.handleRemoveRow(this.props.rowIDX)}
                className="small"
            >
                Remove Row
            </button>
            <br/>
            <br/>
            {(this.props.graphs).map((graph,graphIDX)=>(
                <div>
                <GraphForm className="form" 
                rowIDX={this.props.rowIDX} 
                graphIDX={graphIDX} 
                onChange={(fields,rowIDX,graphIDX) => this.onChange(fields,rowIDX,graphIDX)}
                handleRemoveChart = { (rowIDX,graphIDX) => this.props.handleRemoveChart(rowIDX,graphIDX)}
                />
                <br/>
                </div>
            ))}
            <button
                type="button"
                onClick={ ()=> this.props.handleAddChart(this.props.rowIDX)}
                className="small"
            >
                Add Chart
            </button>
            <h1>___________________</h1>
            <br/>
        </div>
        );
    }
}
