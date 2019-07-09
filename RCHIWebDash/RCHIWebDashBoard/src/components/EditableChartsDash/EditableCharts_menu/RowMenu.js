import React, { Component } from "react";
import '../Menu.css';
import GraphForm from "./GraphForm.js";
import Menu from './Menu';

export default class RowMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleMouseDown(e) {
        this.toggleMenu();
        console.log("clicked");
        e.stopPropagation();
    }
       
    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        var visibility = "hide";
        var change = "nothing";

        if (this.state.visible) {
            visibility = "show";
            change = "change";
        }

        return (
            <div>
                <div>
                    <div class= { change + " container menubutton"} onMouseDown={this.handleMouseDown}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                </div>
                <div id="flyoutMenu" className={visibility + " col-sm-3"} >
                    {(this.props.graphrows).map((row,rowIDX)=>(
                        <Menu
                            graphs={this.props.graphrows[rowIDX]}
                            rowIDX={rowIDX} 
                            onChange={(fields,rowIDX,graphIDX)  => this.props.onChange(fields,rowIDX,graphIDX)}
                            handleAddChart={ (index) => this.props.handleAddChart(index) }
                            handleRemoveChart = { (rowIDX,graphIDX) => this.props.handleRemoveChart(rowIDX,graphIDX)}
                            handleRemoveRow = { (rowIDX) => this.props.handleRemoveRow(rowIDX)}
                            />
                    ))}
                    <br/>
                    <button
                        type="button"
                        onClick={() => this.props.handleAddRow()}
                        className="small"
                    >
                        Add Row
                    </button>
                </div>

            </div>
        );
    }
}