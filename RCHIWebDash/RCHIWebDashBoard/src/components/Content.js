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

import APITest from './APITests/ApiTest';

import Sandbox from './TestingBranch/Sandbox'
import GeneralTable from '../Unsheltered Sheltered General/GeneralTable'
import CityTable from '../Unsheltered Cities/CityTable'

import UnsheleteredVsSheltered from '../Unsheltered vs Sheltered/UnshelteredVsSheltered';
export default class Content extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={LLMap}/>
                    <Route exact path='/VeteranDash' component={VeteranDash}/>
                    <Route exact path='/GeneralDash' component={GeneralDash}/>
                    <Route exact path='/TabChartDash' component={TabChartDash}/> 
                    <Route exact path='/EditableCharts' component={EditableCharts}/>
                    <Route path='/SupervisorialDistricts' component={UnsheleteredSupervisoryDistricts}/>
                    <Route exact path='/CityTables' component={CityTables}/>
                    <Route exact path='/DIYChart' component={DIYChart}/>
                    <Route exact path='/APITest' component={APITest}/>
                    <Route exact path='/CityDashboard' component={CityDashboard}/>
                    <Route exact path='/UnshelteredTrends' component={UnshelteredSubpopulationTrends}/>
                    <Route exact path='/Sandbox' component={Sandbox}/>
                    <Route exact path = "/GeneralTable" component = {GeneralTable} />
                    <Route exact path = "/CityBreakdown" component = {CityTable} />
                    <Route exact path = "/UnshelteredVsSheltered" component = {UnsheleteredVsSheltered} />
                </Switch>
            </div>
        );
    }
}