import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import BarChart from './BarChart';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart'
import './Tab.css';

export default class TabChartChooser extends Component{

    constructor(props){
        super(props);

        this.state = {
            tabVis: false,
            disabled: this.props.disabled ? (this.props.disabled) : ([false,false,false]),
            width: this.props.width ? (this.props.width) : (500),
            height: this.props.height ? (this.props.height) : (500),
            legend: this.props.legend ? (this.props.legend) : false


        }
        this.onContentClick = this.onContentClick.bind(this);
    }

    onContentClick(){
        this.setState(
            {
                tabVis: !this.state.tabVis
            }
        );
    }

    render(){
        var tabVis = "collapsed";
        if (this.state.tabVis)
        {    tabVis = "out";}
        else
        {
            tabVis = "collapsed";
        }


        return (
            <div className="TabCharChooser">
                <Tab.Container defaultActiveKey={this.props.defaultChart}>
                    <div className="">
                        <div className="row">
                            <Tab.Content onClick={this.onContentClick}>
                                <Tab.Pane eventKey={1} title="Line" >
                                    <div>
                                        <LineChart 
                                        datasets = {this.props.datasets[this.props.data]}
                                        data ={0}
                                        title={this.props.title}
                                        width={this.state.width}
                                        height={this.state.height}
                                        legend={this.state.legend}
                                        />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey={2} title="Bar">
                                    <div>
                                        <BarChart 
                                        datasets = {this.props.datasets[this.props.data]}
                                        data ={1}
                                        title={this.props.title}
                                        width={this.state.width}
                                        height={this.state.height}
                                        legend={this.state.legend}
                                        />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey={3} title="Bar">
                                    <div>
                                        <DoughnutChart 
                                        datasets = {this.props.datasets[this.props.data]}
                                        data ={2}
                                        title={this.props.title}
                                        width={this.state.width}
                                        height={this.state.height}
                                        legend={this.state.legend}
                                        />
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                        <div className="row">
                            <Nav  variant="tabs" className={tabVis + " bottom"} >
                                <Nav.Item className="bottom">
                                <Nav.Link className="bottom" eventKey={1} disabled={this.state.disabled[0]}>Line</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="bottom">
                                <Nav.Link className="bottom"eventKey={2} disabled={this.state.disabled[1]}>Bar</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="bottom">
                                <Nav.Link className="bottom" eventKey={3} disabled={this.state.disabled[2]}>Pie</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </Tab.Container>
            </div>
        );
    }
}