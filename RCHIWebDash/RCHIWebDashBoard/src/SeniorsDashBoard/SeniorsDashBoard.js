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
import { seniorsUnshelteredStyling } from "../components/Utilities/styling/chartTablesStyling";
import { Card, Grid, Paper} from "@material-ui/core";

const FILTER_COLUMNS = [
  "Veteran No",
  "No Substance Abuse",
  "Unknown Substance Abuse",
  "No PTSD",
  "Unknown PTSD",
  "No Mental Health Conditions",
  "Unknown Mental Health Conditions",
  "No Physical Disability",
  "Unknown Physical Disability",
  "No Developmental Disability",
  "Unknown Developmental Disability",
  "No Brain Injury",
  "Unknown Brain Injury",
  "Not Victim of Domestic Violence",
  "Unknown Victim of Domestic Violence",
  "No AIDS or HIV",
  "Unknown AIDS or HIV",
  "Jail Release 90 Days: Probation",
  "Jail Release 90 Days: Parole",
  "Jail Release 90 Days: Completed Sentence",
  "Jail Release 90 Days: (Unspecified)",
  "Jail Release 12 Months: Probation",
  "Jail Release 12 Months: Parole",
  "Jail Release 12 Months: Completed Sentence",
  "Jail Release 12 Months: (Unspecified)",
  "No Jail",
  "Unknown Jail",
  "Not Chronically Homeless",
  "Unknown Veteran",
  "Chronically Homeless",
  "Couch",
  "Individuals",
];

const FILTER_GENDERS = [
  "Total",
  "Gender Non-Conforming",
  "Unknown Gender",
  "Transgender",
];

export default class SeniorsDashBoard2 extends Component {
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
          Unsheltered - Newly Homeless
          <h3>
            <strong>Interview Only</strong>
          </h3>
          <h6>
              <em>First time homeless within 12 months</em>
            </h6>
            <p className="subheader"> 2020 Riverside County Pit Count</p>
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
                  {...seniorsUnshelteredStyling["Living Situation"]}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container item md={4}>
            {/* Number of Total Unsheltered */}
            <Grid container item md={6} className="seniorNumbers">
              <Grid container item md={12}>
                <span className="component-header">Total Unsheltered</span>
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
                  Percentage of Unsheltered
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
                {...seniorsUnshelteredStyling["Ethnicity"]}
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
                {...seniorsUnshelteredStyling["Gender"]}
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
                {...seniorsUnshelteredStyling["Subpopulations"]}
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
                {...seniorsUnshelteredStyling["Race"]}
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
                {...seniorsUnshelteredStyling["Household"]}
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
