import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import GeneralDash from './DemoDashboards/GeneralDash';
import VeteranDash from './DemoDashboards/VeteranDash';
import EditableCharts from './EditableChartsDash/EditableCharts';
import SupervisorialDistricts from './SupervisoralDistrictDash/SupervisorialDistricts';
import CityTables from './CityTables/CityTables';
import DIYChart from './DIYChart/DIYChart';
import TabChartDash from './DemoDashboards/TabChartDash';
import LLMap from './map/map';

import APITest from './APITests/ApiTest';


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
                    <Route exact path='/SupervisorialDistricts' component={SupervisorialDistricts}/>
                    <Route exact path='/CityTables' component={CityTables}/>
                    <Route exact path='/DIYChart' component={DIYChart}/>
                    <Route exact path='/APITest' component={APITest}/>
                </Switch>
            </div>
        );
    }
}