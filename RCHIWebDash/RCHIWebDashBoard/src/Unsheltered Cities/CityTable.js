import React, { Component } from "react";

// from packages
import { Header, Segment, Grid, Container } from "semantic-ui-react";
import Select from "react-select";

// components
import Number from "../components/Numbers/Number";
import Total from "../components/Numbers/Total";
import PercentageDistrict from "../components/Numbers/PercentageDistrict";
import PieChart2 from "../components/charts/PieChart2";
import TableComponent4 from "../components/charts/TableComponent4.js";
import BarGraph from "../components/reformatedCharts/BarChart";

// helper functions
import { aggregateFetch, expandOnField } from "../components/Utilities/ListManipulation/aggregateFetch";
import { filterList } from "../components/Utilities/ListManipulation/filter";
import { changeVals2020 } from "../components/Utilities/ListManipulation/changeValue";
import { pieDataManiTotal } from "../components/Utilities/ChartDataManipulation/pieDataManipulation";
import { router } from "../components/Utilities/constants/routing";

// styling 
import { unshelteredCitiesStyling } from "../components/chartTablesStyling/chartTablesStyling";
import "./DottedBox.css";
import "../components/css/dash.css";

// constants
import { FILTER_COLUMNS, urls } from './constants'

export default class CityTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityChoice: "RIVERSIDE", //set default city on first render
      Tables: [],
      selectOptions: [],
    };

    this.myData = [];
  }

  getOptions(options) {
    var newData = [];
    for (var i = 0; i < options.length; i++) {
      var newObject = {
        value: options[i],
        label: options[i],
      };

      newData.push(newObject);
    }
    return newData.sort((a,b) => {
      if(a.label > b.label){
        return 1
      }
      if(b.label > a.label){
        return -1;
      }
      return 0
    });
  }

  reformatData(myTables) {
    //reformat 2019 data
    myTables[router.formerYear + "/GeneralTableSubpopulations"] = expandOnField(
      myTables[router.formerYear + "/GeneralTableSubpopulations"],
      "category"
    );
    myTables[
      router.formerYear + "/GeneralTableSubpopulationsSheltered"
    ] = expandOnField(
      myTables[router.formerYear + "/GeneralTableSubpopulationsSheltered"],
      "category"
    );
    myTables[router.formerYear + "/SubpopulationsByCity"] = expandOnField(
      myTables[router.formerYear + "/SubpopulationsByCity"],
      "city"
    );

    for (const key in myTables[router.formerYear + "/SubpopulationsByCity"]) {
      myTables[router.formerYear + "/SubpopulationsByCity"][
        key
      ] = expandOnField(
        myTables[router.formerYear + "/SubpopulationsByCity"][key],
        "category"
      );
    }

    //reformat 2020 data
    myTables[router.activeYear + "/GeneralTableSubpopulations"] = expandOnField(
      myTables[router.activeYear + "/GeneralTableSubpopulations"],
      "category"
    );
    myTables[
      router.activeYear + "/GeneralTableSubpopulationsSheltered"
    ] = expandOnField(
      myTables[router.activeYear + "/GeneralTableSubpopulationsSheltered"],
      "category"
    );
    myTables[router.activeYear + "/SubpopulationsByCity"] = expandOnField(
      myTables[router.activeYear + "/SubpopulationsByCity"],
      "city"
    );

    for (const key in myTables[router.activeYear + "/SubpopulationsByCity"]) {
      myTables[router.activeYear + "/SubpopulationsByCity"][
        key
      ] = expandOnField(
        myTables[router.activeYear + "/SubpopulationsByCity"][key],
        "category"
      );
    }

    return myTables;
  }
  async componentDidMount() {
    var myTables = await aggregateFetch(urls, false);

    this.setState({
      Tables: await this.reformatData(myTables),
      selectOptions: this.getOptions(
        Object.keys(myTables[router.activeYear + "/SubpopulationsByCity"])
      ).sort(),
      rendered: true,
    });
  }

  setCityChoice(value) {
    //temporary solution to racing condition of data availability in nivo components on the dashboards

    var self = this;
    setTimeout(() => {
      this.setState({
        cityChoice: value.value,
      });
      this.setState({
        cityChoice: value.value,
      });
      this.setState({
        cityChoice: value.value,
      });
      this.setState({
        cityChoice: value.value,
      });
    }, 200);
  }

  runGraphs() {
    const { cityChoice, selectOptions, Tables } = this.state;
    const mainRoute = router.host + "/" +
      router.root + "/" +
      router.activeYear;

    return (
      <div>
        <div className="container my-2">
          <Segment>
            <Header size="huge" textAlign="center">
              Unsheltered - Cities
              <Header sub> 2020 Riverside County Pit Count</Header>
            </Header>
          </Segment>
          <div className="row">
            <div className="col-md-5 align-self-center">
              <Select
                options={selectOptions}
                defaultValue={cityChoice}
                placeholder={cityChoice}
                onChange={(value) => this.setCityChoice(value)}
              />
            </div>
          </div>
          <br/>
          <div className="row dash-row">
            <div className="col-lg ct-number">
              <span className="component-header">
                Total Unsheltered Individuals
              </span>
              <br/>
              <span className="component-header">
                <Total
                  height={400}
                  url={
                    mainRoute +
                    "/SubpopulationsByCity/?search=Age+" +
                    cityChoice
                  }
                />
              </span>
            </div>
            <div className="col-lg ct-number">
              <span
                className="component-header"
                style={{ marginBottom: 20 }}
              >
                Percent of <br/> District{" "}
                {
                  Tables[
                    router.activeYear + "/SubpopulationsByCity"
                  ][cityChoice]["Individuals"][0].district
                }
              </span>
              <br/>
              <span className="component-header">
                <PercentageDistrict
                  height={400}
                  url={
                    mainRoute +
                    "/SubpopulationsByCity/?search=Age+" +
                    cityChoice
                  }
                />
              </span>
            </div>
            <div className="col-lg ct-number">
              <span className="component-header">
                Chronically Homeless
              </span>
              <br/>
              <span className="component-header">
                <Number
                  height={400}
                  url={
                    mainRoute +
                    "/SubpopulationsByCity/?search=homeless+" +
                    cityChoice
                  }
                />
              </span>
            </div>
            <div className="col-lg ct-number">
              <span className="component-header">
                Individuals Observed
              </span>
              <br/>
              <span className="component-header">
                {
                  Tables[
                    router.activeYear + "/SubpopulationsByCity"
                  ][cityChoice]["Individuals"][0].observation
                }
              </span>
            </div>
            <div className="col-lg ct-number">
              <span className="component-header">
                Individuals Interviewed
              </span>
              <br/>
              <span className="component-header">
                {
                  Tables[
                    router.activeYear + "/SubpopulationsByCity"
                  ][cityChoice]["Individuals"][0].interview
                }
              </span>
            </div>
          </div>
          <div className="row dash-row">
            <div className="col-lg dash-col-com">
              <div className="ct-grid">
                <div className="ct-r1">
                  <TableComponent4
                    data={changeVals2020(
                      filterList(
                        Tables[
                          router.activeYear + "/SubpopulationsByCity"
                        ][cityChoice]["Subpopulations"],
                        "subpopulation",
                        FILTER_COLUMNS
                      )
                    )}
                    {...unshelteredCitiesStyling["Subpopulations"]}
                  />
                </div>
                <div className="ct-r2">
                  <TableComponent4
                    data={filterList(
                      Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][cityChoice]["Living Situation"],
                      "subpopulation",
                      FILTER_COLUMNS
                    ).sort((a, b) => {
                      return b.total - a.total;
                    })}
                    {...unshelteredCitiesStyling["Living Situation"]}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 dash-col-com">
              <div className="ct-grid">
                <div className="ct-r1">
                  <BarGraph
                    data={filterList(
                      Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][cityChoice]["Race"],
                      "subpopulation",
                      ["Total"]
                    )}
                    {...unshelteredCitiesStyling["Race Chart"]}
                  />
                </div>
                <div className="ct-r2">
                  <BarGraph
                    data={filterList(
                      Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][cityChoice]["Gender"],
                      "subpopulation",
                      ["Total"]
                    )}
                    // indexBy = {"subpopulation"}
                    // keys = {["interview"]}
                    // margin = {{top: 40, bottom:30, right: 30, left: 30}}
                    {...unshelteredCitiesStyling["Gender Chart"]}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg dash-col-com">
              <div className="ct-grid">
                <div className="ct-pie-r1">
                  <div>
                    <PieChart2
                      data={pieDataManiTotal(
                        filterList(
                          Tables[
                            router.activeYear + "/SubpopulationsByCity"
                          ][cityChoice]["Ethnicity"],
                          "subpopulation",
                          ["Total"]
                        )
                      )}
                      margin={{ bottom: 60, top: 30, right: 60, left: 70 }}
                    />
                  </div>
                </div>
                <div className="ct-r2">
                  <TableComponent4
                    data={changeVals2020(
                      filterList(
                        Tables[
                          router.activeYear + "/SubpopulationsByCity"
                        ][cityChoice]["Gender"].sort((a, b) => {
                          return b.total - a.total;
                        }),
                        "subpopulation",
                        ["Total"]
                      )
                    )}
                    {...unshelteredCitiesStyling["Gender Table"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
  render() {
    return (
      <div>
        {this.state.rendered ? (
          this.runGraphs()
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
