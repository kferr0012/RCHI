import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { router } from "../components/Utilities/constants/routing";

import GeneralDash from "./DemoDashboards/GeneralDash";
import VeteranDash from "./DemoDashboards/VeteranDash";
import EditableCharts from "./EditableChartsDash/EditableCharts";
import SupervisorialDistricts from "./SupervisoralDistrictDash/SupervisorialDistricts";
import CityTables from "./CityTables/CityTables";
import DIYChart from "./DIYChart/DIYChart";
import TabChartDash from "./DemoDashboards/TabChartDash";
import CityDashboard from "./CityDashboard_3.5/CityDashboard";
import SeniorsDashboard from "./../SeniorsDashBoard/SeniorsDashBoard";

import UnshelteredSubpopulationTrends from "../Unsheltered Trends/UnshelteredSubpopulationTrends";
import UnsheleteredSupervisoryDistricts from "../Unsheltered Supervisory District/UnshelteredSupervisoryDistricts";
import LLMap from "./map/map";
import GeneralDashboard from "../components/TestingBranch/GeneralDashboard";
import GeneralDashboard2 from "../components/TestingBranch/GeneralDashboard2";

import APITest from "./APITests/ApiTest";

import Sandbox from "./TestingBranch/Sandbox";
import GeneralPieChart from "./charts/PieChart";
import GeneralTable from "../Unsheltered Sheltered General/GeneralTable";
import CityTable from "../Unsheltered Cities/CityTable";
import errorPage from "./404Page";

import UnsheleteredVsSheltered from "../Unsheltered vs Sheltered/UnshelteredVsSheltered";
import NewlyHomelessGrid from "../NewlyHomelessDashboard/NewlyHomelessGrid";
import NewlyHomelessGrid2 from "../NewlyHomelessDashboard/NewlyHomeless2";


export default class Content extends Component {
  constructor() {
    super();
    this.state = {
      rendered: true,
      Tables: []
    };
  }

  async componentDidMount() {
    // var fetchedTables = await aggregateFetchbyConstants()
    // this.setState({
    //     Tables : fetchedTables,
    //     rendered : true,
    // })
  }

  render() {
    return (
      <div>
        {this.state.rendered ? (
          <div>
            <Switch>
              {/* Main Links */}
              <Route
                exact
                path="/"
                component={() => (
                  <GeneralTable router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/Gen"
                component={() => (
                  <GeneralDashboard2
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/GeneralTable"
                component={() => (
                  <GeneralTable router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/UnshelteredVsSheltered"
                component={() => (
                  <UnsheleteredVsSheltered
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/NewlyHomeless"
                component={() => (
                  <NewlyHomelessGrid
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
              exact path='/NewlyHomeless2'
              component={()=> (
                <NewlyHomelessGrid2
                router={router}
                Tables={this.state.Tables}/>
              )}/>
              <Route
                exact
                path="/SeniorsDashBoard"
                component={() => (
                  <SeniorsDashboard
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/UnshelteredTrends"
                component={() => (
                  <UnshelteredSubpopulationTrends
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              {/* Supervisory Districts cannot be exact path because it has subpages*/}
              <Route
                path="/SupervisorialDistricts"
                component={() => (
                  <UnsheleteredSupervisoryDistricts
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/CityBreakdown"
                component={() => (
                  <CityTable router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/Map"
                component={() => (
                  <LLMap router={router} Tables={this.state.Tables} />
                )}
              />

              {/* Unused Links */}
              <Route
                exact
                path="/VeteranDash"
                component={() => (
                  <VeteranDash router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/GeneralDash"
                component={() => (
                  <GeneralDash router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/TabChartDash"
                component={() => (
                  <TabChartDash router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/EditableCharts"
                component={() => (
                  <EditableCharts router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/CityDashboard"
                component={() => (
                  <CityDashboard router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/CityTables"
                component={() => (
                  <CityTables router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/DIYChart"
                component={() => (
                  <DIYChart router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/APITest"
                component={() => (
                  <APITest router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/generalDashboard"
                component={() => (
                  <GeneralDashboard
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
            
              <Route
                exact
                path="/Sandbox"
                component={() => (
                  <Sandbox router={router} Tables={this.state.Tables} />
                )}
              />
              <Route component={errorPage} />
            </Switch>
          </div>
        ) : (
          0
        )}
      </div>
    );
  }
}
