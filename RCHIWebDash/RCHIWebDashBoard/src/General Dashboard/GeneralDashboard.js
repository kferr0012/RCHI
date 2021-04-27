// General Sheltered and Unsheltered Dashboard

import React, { Component } from 'react';
import { router } from '../components/Utilities/constants/routing';

import LineGraph from '../components/charts/LineGraph';
import PieChart2 from '../components/charts/PieChart2';
import PieChart from '../components/reformatedCharts/PieChart';
import BarChart from '../components/reformatedCharts/BarChart';
import TableComponent4 from '../components/charts/TableComponent4';

import { changeVals2020 } from '../components/Utilities/ListManipulation/changeValue';
import NumberPercentage from '../components/Numbers/NumberPercentage';
import Change from '../components/Numbers/Change';
import TotalGeneral from '../components/Numbers/TotalGeneral';

import {
  pieDataManiTotal,
  pieDataManiInterview
} from '../components/Utilities/ChartDataManipulation/pieDataManipulation';
import {
  aggregateFetch,
  expandOnField
} from '../components/Utilities/ListManipulation/aggregateFetch';
import {
  orderSubs,
  filterList,
  NumberCreator
} from '../components/Utilities/ListManipulation/filter';
import './dash.css';
import { Header } from 'semantic-ui-react';
import { Grid, Paper } from '@material-ui/core';


import {data} from "../frontendData2021/generalData";
import {generalDashboardStyling as styles}  from "../components/Utilities/styling/chartTablesStyling";

import {
  GEN_SUBPOP_ORDER,
  FILTER_COLUMNS,
  FILTERED_COUNTS,
  SHELTERED_SUBPOP_ORDER
} from './constants';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    // current year and previous year subpopulation data and sheltered data
    this.state = {
      urls: [
        `${router.host}/${router.root}/${router.activeYear}/GeneralTableSubpopulations/`,
        `${router.host}/${router.root}/${router.activeYear}/GeneralTableSubpopulationsSheltered/`,
        `${router.host}/${router.root}/${router.activeYear}/GeneralTableSubpopulationsTotalCounts/`,
        `${router.host}/${router.root}/${router.formerYear}/GeneralTableSubpopulations/`,
        `${router.host}/${router.root}/${router.formerYear}/GeneralTableSubpopulationsSheltered/`
      ],
      Tables: [],
      NumberValues: null,
      render: false
    };
  }

  formatData(Tables) {
    //reformat get tables unexpands and expanded by category (easier to process certain components)
    for (var index in Tables) {
      Tables[index + '-unexpanded'] = Tables[index];
      Tables[index] = expandOnField(Tables[index], 'category');
    }
    return Tables;
  }

  getOrderedShelteredData() {
    var result = this.state.Tables[
      router.formerYear + '/GeneralTableSubpopulationsSheltered'
    ]['Total']
      .concat(
        this.state.Tables[
          router.formerYear + '/GeneralTableSubpopulationsSheltered'
        ]['Age']
      )
      .concat(
        this.state.Tables[
          router.formerYear + '/GeneralTableSubpopulationsSheltered'
        ]['Gender']
      )
      .concat(
        this.state.Tables[
          router.formerYear + '/GeneralTableSubpopulationsSheltered'
        ]['Ethnicity']
      )
      .concat(
        this.state.Tables[
          router.formerYear + '/GeneralTableSubpopulationsSheltered'
        ]['Race']
      )
      .concat(
        this.state.Tables[
          router.formerYear + '/GeneralTableSubpopulationsSheltered'
        ]['Subpopulations']
      )
      .concat(
        this.state.Tables[
          router.activeYear + '/GeneralTableSubpopulationsSheltered-unexpanded'
        ]
      );

    return result;
  }

  getOrderedTable() {
    //concat in a specific order to sort data by group
    var unshelteredData = this.state.Tables[
      `${router.activeYear}/GeneralTableSubpopulations`
    ]['Total']
      .concat(
        this.state.Tables[`${router.activeYear}/GeneralTableSubpopulations`][
          'Age'
        ]
      )
      .concat(
        this.state.Tables[`${router.activeYear}/GeneralTableSubpopulations`][
          'Subpopulations'
        ]
      );

    var shelteredData = this.state.Tables[
      `${router.activeYear}/GeneralTableSubpopulationsSheltered`
    ]['Total']
      .concat(
        this.state.Tables[
          `${router.activeYear}/GeneralTableSubpopulationsSheltered`
        ]['Age']
      )
      .concat(
        this.state.Tables[
          `${router.activeYear}/GeneralTableSubpopulationsSheltered`
        ]['Subpopulations']
      );

    var totalCounts = this.state.Tables[
      `${router.activeYear}/GeneralTableSubpopulationsTotalCounts`
    ]['Total']
      .concat(
        this.state.Tables[
          `${router.activeYear}/GeneralTableSubpopulationsTotalCounts`
        ]['Age']
      )
      .concat(
        this.state.Tables[
          `${router.activeYear}/GeneralTableSubpopulationsTotalCounts`
        ]['Subpopulations']
      );

    var resultData = shelteredData.concat(unshelteredData).concat(totalCounts);

    return resultData;
  }

  async componentDidMount() {
    var myTables = await aggregateFetch(this.state.urls, false);

    //This Functions Returns a list of objects with the Highlighted Numbers used in the dashboard
    const NumberValues = NumberCreator(
      myTables[`${router.activeYear}/GeneralTableSubpopulations`]
    );

    this.setState({
      Tables: this.formatData(myTables),
      rendered: true,
      NumberValues: NumberValues
    });
  }

  title() {
    return (
      <div className="dashboard">
        <Paper variant="elevation" elevation={2}>
          <h1 className="dashboard-title">General Sheltered Information</h1>
        </Paper>
      </div>
    );
  }

  dashboard() {
    return (
      <div className="container">
        <Grid container item spacing={3} md={12}>
          <Grid container item md={12}>
            {this.title()}
          </Grid>
          <Grid container md={6}>
            <Grid item md={12}>
              {/* Subpopulation table for sheltered */}
              <div className="change-label">
                <Change
                  // height={15}
                  height={40}
                  url={`${router.host}/${router.root}'/Trends/?search=2020`}
                />
              </div>
              <TableComponent4
                data={data["sheltered statistics"]}
                {...styles["Sheltered Statistics"]}
              />
            </Grid>
            <Grid container md={12}>
              <Grid item md={6}>
                {/* Race Bar Graph */}
                <p className="component-header">
                  Race <p className="component-subheader">Total Count </p>
                </p>
                <BarChart
                  data={data["race"]}
                  {...styles["Race"]}
                />
              </Grid>
              <Grid item md={6}>
                <p className="component-header">
                  Age
                  <p className="component-subheader">Total Count </p>
                </p>
                <BarChart
                  data={data["age"]}
                  {...styles["Age"]}
                />
              </Grid>
            </Grid>
            <Grid container item md={6}>
              {/* Gender pie chart */}
              <p className="component-header">
                Gender
                <p className="component-subheader">Total Count </p>
              </p>
              <PieChart
                data={data["gender"]}
                {...styles["Gender"]}
              />
            </Grid>
            <Grid container item md={6}>
              {/* Ethnicity pie chart*/}
              <p className="component-header">
                Ethnicity
                <p className="component-subheader">Total Count </p>
              </p>
              <PieChart
                data={data["ethnicity"]}
                {...styles["Ethnicity"]}
              />
            </Grid>
          </Grid>
          <Grid container item md={6}>
            <Grid container item md={12}>
              {/* Homeless Population Trend Graph*/}
              <span className="component-header">
                Homeless Population Trend
              </span>
              <div
                className="homeless-population-trend"
                style={{ position: 'relative' }}>
                <LineGraph
                  data={this.state.Tables}
                  {...styles["Homeless Population Trend"]}
                />
              </div>
            </Grid>
            <Grid container md={12} className="grey-box" spacing={2}>
              <Grid container item md={4} spacing={1}>
                <Grid item md={12}>
                  {/* Mental health conditions percent */}
                  <NumberPercentage
                    data={this.state.NumberValues}
                    subpopulation={'Mental Health Conditions'}
                    {...styles["Mental Health"]}
                  />
                </Grid>
                <Grid item md={12}>
                  {/* substance abuse issues percent */}
                  <div className="number-percentage">
                    <NumberPercentage
                      data={this.state.NumberValues}
                      subpopulation={'Substance Abuse'}
                      {...styles["Substance Abuse"]}
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  {/* physical disability issues percent*/}
                  <div className="number-percentage">
                    <NumberPercentage
                      data={this.state.NumberValues}
                      subpopulation={'Physical Disability'}
                      {...styles["Physical Disability"]}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container item md={4} spacing={1}>
                <Grid container item md={12}>
                  {/* Total sheltered count */}
                  <span>
                    <div style={{ fontSize: '40px', textAlign: 'middle' }}>
                      <TotalGeneral
                        data={this.state.NumberValues}
                        subpopulation={'Individuals'}
                        height={50}
                      />
                    </div>
                    <span className="component-header">
                      Total Sheltered Count
                    </span>
                  </span>
                </Grid>
                <Grid container item md={12}>
                  {/* household composition table */}
                  <TableComponent4
                    data={data["household composition"]}
                    {...styles["Household Composition"]}
                  />
                </Grid>
              </Grid>
              <Grid container item md={4} spacing={1}>
                <Grid container item md={12}>
                  <div className="living-situation-pie-chart">
                    {/* living situations pie chart */}
                    <Header size="small" textAlign="center">
                      Prior Living Situations
                    </Header>
                    <PieChart2
                      data={data["prior living situations"]}
                      {...styles["Prior Living Situations"]}
                    />
                  </div>
                </Grid>
                <Grid container item md={12}>
                  {/*living situations table*/}
                  <TableComponent4
                    data={data["living situations"]}
                    {...styles["Living Situations Table"]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.rendered ? (
          this.dashboard()
        ) : (
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    );
  }
}
