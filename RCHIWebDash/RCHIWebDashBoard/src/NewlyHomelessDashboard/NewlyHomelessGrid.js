// Newly Homeless Dashboard

import React, { Component } from "react";
import { aggregateFetch } from "../components/Utilities/ListManipulation/aggregateFetch";

import TableComponent4 from "../components/charts/TableComponent4";
import Total from "../components/Numbers/Total";
import PercentageDistrict from "../components/Numbers/PercentageDistrict";
import BarChart from "../components/reformatedCharts/BarChart";
import PieChart from "../components/reformatedCharts/PieChart";

import { filterList } from "../components/Utilities/ListManipulation/filter";
import { changeVals2020 } from "../components/Utilities/ListManipulation/changeValue";
import { pieDataManiTotal } from "../components/Utilities/ChartDataManipulation/pieDataManipulation";
import { router } from "../components/Utilities/constants/routing";

import "../components/css/dash.css";
import { newlyHomelessStyling } from "../components/Utilities/styling/chartTablesStyling";
import { Card, Grid, Paper } from "@material-ui/core";

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

export default class NewlyHomelessGrid extends Component {
  constructor() {
    super();
    this.state = {
      urls: [
        `${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/`,
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
    // Page Banner
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
    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid container item md={12}>
            {/* Title */}
            {this.title()}
          </Grid>

          <Grid container md={4}>
            {/* Age Table, sorted and showing percentage */}
            <Grid container item md={12}>
              <TableComponent4
                data={changeVals2020(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/NewlyHomelessByCity`
                    ]["Age"],
                    "subpopulation",
                    FILTER_COLUMNS
                  )
                ).sort((a, b) => b.total - a.total)}
                percentage_flag={1}
                tableName="Age"
                height="120%"
                {...newlyHomelessStyling["Age"]}
              />
            </Grid>

            {/* Living Situation Table, sorted and showing percentage */}
            <Grid container item md={12}>
              <TableComponent4
                data={filterList(
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    "Living Situation"
                  ],
                  "subpopulation",
                  FILTER_COLUMNS
                ).sort((a, b) => b.total - a.total)}
                percentage_flag={1}
                {...newlyHomelessStyling["Living Situation"]}
              />
            </Grid>
          </Grid>

          <Grid container item md={4}>
            <Grid container item md={12}>
              <Grid container item md={6} className="seniorNumbers">
                {/* Number of Total Unsheltered */}
                <span className="component-header">Total Unsheltered</span>
                <br />
                <Grid container item md={12}>
                  <span className="component-header">
                    <Total
                      url={`${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/?search=Individuals`}
                      cityChoice={""}
                      height={400}
                    />
                  </span>
                </Grid>
              </Grid>
              <Grid container item md={6} className="seniorNumbers">
                {/* Percent of Unsheltered are Seniors*/}
                <span className="component-header">
                  Percentage of Unsheltered
                </span>
                <br />
                <Grid container item md={12}>
                  <span className="component-header">
                    <PercentageDistrict
                      url={`${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/?search=Individuals`}
                      districtUrl={`${router.host}/${router.root}/${router.activeYear}/CityTotalByYear/`}
                      activeYear={router.activeYear}
                      cityChoice={""}
                      dashboard={"Newly Homeless"}
                    />
                  </span>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item md={12}>
              <Grid container item md={12}>
                {/* Ethnicity Pie Chart  */}
                <PieChart
                  data={pieDataManiTotal(
                    filterList(
                      this.state.Tables[
                        `${router.activeYear}/NewlyHomelessByCity`
                      ]["Ethnicity"],
                      "subpopulation",
                      ["Total"]
                    )
                  )}
                  {...newlyHomelessStyling["Ethnicity"]}
                />
              </Grid>
              <Grid container item md={12}>
                {/* Gender Pie Chart */}
                <PieChart
                  data={pieDataManiTotal(
                    filterList(
                      this.state.Tables[
                        `${router.activeYear}/NewlyHomelessByCity`
                      ]["Gender"],
                      "subpopulation",
                      ["Total"]
                    ),
                    newlyHomelessStyling["Gender"].percentage
                  )}
                  {...newlyHomelessStyling["Gender"]}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container item md={4}>
            {/* Subpopulation Statistics Table */}
            <TableComponent4
              data={changeVals2020(
                filterList(
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    "Subpopulations"
                  ],
                  "subpopulation",
                  FILTER_COLUMNS
                )
              )}
              tableName="Subpopulation Statistics"
              percentage_flag={1}
              individuals_row={null}
              {...newlyHomelessStyling["Subpopulations"]}
            />
          </Grid>

          {/* Race Barchart */}
          <Grid container item md={8}>
            <Card
              variant="outlined"
              style={{ width: "100%" }}
              className="seniorTable"
            >
              <BarChart
                data={filterList(
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    "Race"
                  ],
                  "subpopulation",
                  ["Total"]
                )}
                {...newlyHomelessStyling["Race"]}
              />
            </Card>
          </Grid>
          {/* Household Composition */}
          <Grid container item md={4}>
            <Card
              variant="outlined"
              style={{ width: "100%" }}
              className="seniorTable"
            >
              <TableComponent4
                data={
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    "Households"
                  ]
                }
                {...newlyHomelessStyling["Household"]}
                percentage_flag={1}
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
