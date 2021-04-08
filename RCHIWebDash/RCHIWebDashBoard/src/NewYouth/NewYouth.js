// Seniors Dashboard

import React, { Component } from "react";
import { aggregateFetch } from "../components/Utilities/ListManipulation/aggregateFetch";

import TableComponent4 from "../components/charts/TableComponent4";
import BarChart from "../components/reformatedCharts/BarChart";
import PieChart from "../components/reformatedCharts/PieChart";
import Total from "../components/Numbers/Total";
import PercentageDistrict from "../components/Numbers/PercentageDistrict";

import { filterList } from "../components/Utilities/ListManipulation/filter";
import { pieDataManiTotal } from "../components/Utilities/ChartDataManipulation/pieDataManipulation";
import { router } from "../components/Utilities/constants/routing";

import "../components/css/dash.css";
import { newYouthStyling } from "../components/Utilities/styling/chartTablesStyling";
import { Card, Grid, Paper} from "@material-ui/core";

import {FILTER_COLUMNS, FILTER_GENDERS} from './constants.js';


export default class NewYouth extends Component {
  constructor() {
    super();
    this.state = {
      urls: [
        `${router.host}/${router.root}/${router.activeYear}/SeniorsSubpopulations/`,
      ],
      rendered: false,
      Tables: [],
    };
  }

  async componentDidMount() {
    var Tables = await aggregateFetch(this.state.urls);
    this.setState({
      Tables: Tables,
      rendered: true,
    });
  }

  title() {
    // Page banner
    return (
      <div className="dashboard">
      <Paper variant="elevation" elevation={2}>
        <h1 className="dashboard-title">
        New Youth
        <h3>
          <strong>Sheltered Only</strong>
        </h3>
       
        </h1>
      </Paper>
  </div>
    );
  }

  dashboard() {
    console.log(
      "Seniors Subpop Living situation",
      this.state.Tables[`${router.activeYear}/SeniorsSubpopulations`]
    );
    console.log(
      "Filtered Seniors Subpop Living situation",
      filterList(
        this.state.Tables[`${router.activeYear}/SeniorsSubpopulations`][
          "Living Situation"
        ],
        "subpopulation",
        FILTER_COLUMNS
      )
    );
    console.log(
      "Filtered Seniors Subpop Living situation",
      filterList(
        this.state.Tables[`${router.activeYear}/SeniorsSubpopulations`][
          "Living Situation"
        ],
        "category",
        FILTER_COLUMNS
      )
    );
    return (
      <div className="container">
        <Grid container spacing={1}>
          <Grid container item md={12}>
            {this.title()}
          </Grid>
          <Grid container item md={4}>
            {/* Living Situation Table, sorted by highest to lowest count */}
            <Grid container item md={12}>
              <div className="seniorTable">
                <TableComponent4
                  data={filterList(
                    this.state.Tables[
                      `${router.activeYear}/SeniorsSubpopulations`
                    ]["Living Situation"],
                    "subpopulation",
                    FILTER_COLUMNS
                  ).sort((a, b) => b.total - a.total)}
                  {...newYouthStyling["Living Situation"]}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container item md={4}>
            {/* Number of Total */}
            <Grid container item md={6} className="seniorNumbers">
              <Grid container item md={12}>
                <span className="component-header">Total Sheltered</span>
              </Grid>
              <Grid container item md={12}>
                <span className="component-header">
                  <Total
                    url={`${router.host}/${router.root}/${router.activeYear}/SeniorsSubpopulations/?search=Individuals`}
                    cityChoice={""}
                    height={400}
                  />
                </span>
              </Grid>
            </Grid>
            {/* Percent of Unsheltered are Seniors*/}
            <Grid container item md={6} className="seniorNumbers">
              <Grid container item md={12}>
                <span className="component-header">
                  Percentage of Sheltered
                </span>
              </Grid>
              <Grid container item md={12}>
                <span className="component-header">
                  <PercentageDistrict
                    url={`${router.host}/${router.root}/${router.activeYear}/SeniorsSubpopulations/?search=Individuals`}
                    districtUrl={`${router.host}/${router.root}/${router.activeYear}/CityTotalByYear/`}
                    activeYear={router.activeYear}
                    dashboard={"Seniors"}
                  />
                </span>
              </Grid>
            </Grid>
            <Grid container item md={12}>
              {/* Ethnicity Pie Chart  */}
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/SeniorsSubpopulations`
                    ]["Ethnicity"],
                    "subpopulation",
                    ["Total"]
                  )
                )}
                {...newYouthStyling["Ethnicity"]}
              />
            </Grid>
            <Grid container item md={12}>
              {/* Gender Pie Chart */}
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/SeniorsSubpopulations`
                    ]["Gender"],
                    "subpopulation",
                    FILTER_GENDERS
                  )
                )}
                {...newYouthStyling["Gender"]}
              />
            </Grid>
          </Grid>
          <Grid container item md={4}>
            {/*  Subpopulation Statistics Table with percentage shown*/}
            <div className="seniorTable">
              <TableComponent4
                data={filterList(
                  this.state.Tables[
                    `${router.activeYear}/SeniorsSubpopulations`
                  ]["Subpopulations"],
                  "subpopulation",
                  FILTER_COLUMNS
                )}
                percentage_flag={1}
                {...newYouthStyling["Subpopulations"]}
              />
            </div>
          </Grid>
          <Grid container item md={9}>
            {/* Race Bar graph */}
            <Card
              variant="outlined"
              style={{ width: "100%" }}
              className="seniorTable"
            >
              <BarChart
                data={filterList(
                  this.state.Tables[
                    `${router.activeYear}/SeniorsSubpopulations`
                  ]["Race"],
                  "subpopulation",
                  ["Total"]
                )}
                {...newYouthStyling["Race"]}
              />
            </Card>
          </Grid>
          <Grid container item md={3}>
            <Card
              variant="outlined"
              style={{ width: "100%" }}
              className="seniorTable"
            >
              {/* Household Composition table sorted from highest to least counts */}
              <TableComponent4
                data={filterList(
                  this.state.Tables[
                    `${router.activeYear}/SeniorsSubpopulations`
                  ]["Households"],
                  "subpopulation",
                  FILTER_COLUMNS
                )}
                {...newYouthStyling["Household"]}
              />
            </Card>
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
          <div>
            <div class="lds-ring"></div>
          </div>
        )}
      </div>
    );
  }
}
