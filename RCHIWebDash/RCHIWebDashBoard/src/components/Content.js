import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import GeneralDash from './DemoDashboards/GeneralDash';
import VeteranDash from './DemoDashboards/VeteranDash';
import EditableCharts from './EditableChartsDash/EditableCharts';
import SupervisorialDistricts from './SupervisoralDistrictDash/SupervisorialDistricts';
import CityTables from './CityTables/CityTables';
import DIYChart from './DIYChart/DIYChart';
import TabChartDash from './DemoDashboards/TabChartDash';
import CityDashboard from './CityDashboard_3.5/CityDashboard'

import UnshelteredSubpopulationTrends from '../Unsheltered Trends/UnshelteredSubpopulationTrends'
import UnsheleteredSupervisoryDistricts from '../Unsheltered Supervisory District/UnshelteredSupervisoryDistricts'
import LLMap from './map/map';
import GeneralDashboard from '../components/TestingBranch/GeneralDashboard';

import APITest from './APITests/ApiTest';

import Sandbox from './TestingBranch/Sandbox'
import GeneralPieChart from "./charts/PieChart";
import GeneralTable from '../Unsheltered Sheltered General/GeneralTable'
import CityTable from '../Unsheltered Cities/CityTable'

import UnsheleteredVsSheltered from '../Unsheltered vs Sheltered/UnshelteredVsSheltered';
import NewlyHomelessGrid from '../NewlyHomelessDashboard/NewlyHomelessGrid';
import {host, root, availableYears, getAvailableTables} from '../components/Utilities/constants/routing';
import { aggregateFetchbyConstants } from './Utilities/ListManipulation/aggregateFetch';

export default class Content extends Component{

    constructor(){
        super()
        this.state = {
            rendered : false,
            Tables : [],
        }
        //getAvailableTables()
    }

    async componentDidMount(){
        var fetchedTables = await aggregateFetchbyConstants()

        this.setState({
            Tables : fetchedTables,
            rendered : true,
        })
    }


    render(){
        return(
            <div>
            {this.state.rendered ? 
                <div>
                    <Switch>
                        <Route exact path='/' component={ () => <LLMap host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } />
                        <Route exact path='/VeteranDash' component={ () => <VeteranDash host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/GeneralDash' component={ () => <GeneralDash host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/TabChartDash' component={ () => <TabChartDash host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } />
                        <Route exact path='/EditableCharts' component={ () => <EditableCharts host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route path='/SupervisorialDistricts' component={ () => <UnsheleteredSupervisoryDistricts host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/CityTables' component={ () => <CityTables host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/DIYChart' component={ () => <DIYChart host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/APITest' component={ () => <APITest host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/CityDashboard' component={ () => <CityDashboard host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/UnshelteredTrends' component={ () => <UnshelteredSubpopulationTrends host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/generalDashboard' component={ () => <GeneralDashboard host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path='/Sandbox' component={ () => <Sandbox host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path = "/GeneralTable" component = { () => < GeneralTable host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } />  
                        <Route exact path = "/CityBreakdown" component = { () => <CityTable host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path = "/UnshelteredVsSheltered" component = {() => <UnsheleteredVsSheltered host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } /> 
                        <Route exact path = "/NewlyHomeless" component = { () => <NewlyHomelessGrid host = {host} root = {root} availableYear = {availableYears} Tables = {this.state.Tables} /> } />

                    </Switch>
                </div>
            : 0
            }
            </div>
        );
    }
}
