import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from './logo.png';


export default class Header extends Component{

    state = {activeItem: ''}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const {activeItem} = this.state;
        return(
            
            <div>
                <div className="App-header">
                    {/* This is weirdly typed to get each capital letter a different size and color */}
                    <p id="title">
                        <span className="title-highlight">R</span>
                        <span>IVERSIDE </span>
                        <span className="title-highlight">C</span>
                        <span>OUNTY </span>
                        <span className="title-highlight">H</span>
                        <span>EALTH </span>
                        <span className="title-highlight">I</span>
                        <span>NFORMATICS </span>
                    </p>
                </div>
                {/* notice the " | "  at the end of each span to demarcate each link */}
                {/*{window.innerHeight} {window.innerWidth} is just to give me some help with sizing*/}
                <p id="router-links">
                <span><Link to='/'>Map</Link> | </span>
                {/* <span><Link to='/VeteranDash'>VeteranDash</Link> | </span>
                <span><Link to='/GeneralDash'>GeneralDash</Link> | </span>
                <span><Link to='/EditableCharts'>EditableCharts</Link> | </span> */}
                <span><Link to='/SupervisorialDistricts'>Supervisorial Districts</Link> | </span>
                {/* <span><Link to='/TabChartDash'>Tab Chart Demo</Link> | </span> */}
                <span><Link to='/CityTables'>City Table</Link> | </span>
                <span><Link to='/CityDashboard'>City Dashboard</Link> | </span>
                {/* <span>    {window.innerHeight} {window.innerWidth}</span> */}
                <span><Link to='/DIYChart'>DIY Chart</Link> |</span>
                <span><Link to='/UnshelteredTrends'>Unsheltered Trends</Link> | </span>
                <span><Link to='/Sandbox'>Sandbox</Link> | </span>
                <span><Link to='/GeneralTable'>General Table</Link> | </span>
                <span><Link to='/CityBreakdown'>City Breakdown Table</Link> | </span>
                <span><Link to='/UnshelteredvsSheltered'>Unsheltered vs Sheltered</Link> | </span>
                </p>
            
            </div>
        );
    }
}