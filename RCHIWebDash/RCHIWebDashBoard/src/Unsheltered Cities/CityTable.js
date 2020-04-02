import React, { Component } from "react";

import {Header,Segment, Grid, Container} from 'semantic-ui-react'

import { CustomToggle, CustomMenu } from "./components/CustomToggle";
import { Dropdown, Button } from "react-bootstrap";

import Number from "../components/Numbers/Number";
import Total from "../components/Numbers/Total";
import PercentageDistrict from "../components/Numbers/PercentageDistrict"
import { Row, Col } from "antd";

import Select from "react-select";

import "./DottedBox.css";
import "../components/css/dash.css";

import BarGraph2 from "../components/TestingBranch/BarGraph";
import PieChart2 from "../components/charts/PieChart2";
import LineGraph from "../components/charts/LineGraph";
import TableComponent4 from "../components/charts/TableComponent4.js";
import { unshelteredCitiesStyling, ContainerWidth } from '../components/chartTablesStyling/chartTablesStyling'
import BarGraph from '../components/reformatedCharts/BarChart'

import {
  aggregateFetch,
  expandOnField
} from "../components/Utilities/ListManipulation/aggregateFetch";
import {
  filter,
  subset,
  filterList
} from "../components/Utilities/ListManipulation/filter";
import { getOverflowOptions } from "antd/lib/tooltip/placements";

import { router } from "../components/Utilities/constants/routing";

const DemoBox = props => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

const DottedBox = () => (
  <div className="DottedBox">
    <p className="DottedBox_content">Graph/Table</p>
  </div>
);

const FILTER_COLUMNS= [
  "Total",
  "Veteran No",
  "Not Chronically Homeless",
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
  "Unknown Veteran"
]

export default class CityTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityChoice: "RIVERSIDE", //set default city on first render

      urls: [
        router.host +
          "/" +
          router.root +
          "/" +
          router.formerYear +
          "/GeneralTableSubpopulations/",
        router.host +
          "/" +
          router.root +
          "/" +
          router.formerYear +
          "/GeneralTableSubpopulationsSheltered/",
        router.host +
          "/" +
          router.root +
          "/" +
          router.formerYear +
          "/SubpopulationsByCity/",
        router.host +
          "/" +
          router.root +
          "/" +
          router.activeYear +
          "/GeneralTableSubpopulations/",
        router.host +
          "/" +
          router.root +
          "/" +
          router.activeYear +
          "/GeneralTableSubpopulationsSheltered/",
        router.host +
          "/" +
          router.root +
          "/" +
          router.activeYear +
          "/SubpopulationsByCity/"
      ],
      Tables: [],
      selectOptions: []
    };

    this.myData = [];
  }

  getOptions(options) {
    var newData = [];
    for (var i = 0; i < options.length; i++) {
      var newObject = {
        value: options[i],
        label: options[i]
      };

      newData.push(newObject);
    }

    return newData;
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

    var myTables = await aggregateFetch(this.state.urls, false);

    this.setState({
      Tables: await this.reformatData(myTables),
      selectOptions: this.getOptions(
        Object.keys(myTables[router.activeYear + "/SubpopulationsByCity"])
      ),
      rendered: true
    });
  }

  setCityChoice(value) {
    //temporary solution to racing condition of data availability in nivo components on the dashboards

    var self = this;
    setTimeout(() => {
      this.setState({
        cityChoice: value.value
      });
      this.setState({
        cityChoice: value.value
      });
      this.setState({
        cityChoice: value.value
      });
    }, 200);

  }

  runGraphs() {
    const Tables = this.state.Tables;
    const cityChoice = this.state.cityChoice;
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
                options={this.state.selectOptions}
                defaultValue={
                  this.state.selectOptions[this.state.selectOptions.length - 1]
                }
                onChange={value => this.setCityChoice(value)}
              />
            </div>
          </div>
          <div className="row dash-row">
            <div className="col-md dash-col-com">
              <div className="ct-grid-side-left">
                <div className="ct-side-r1">
                  <TableComponent4
                    data={filterList(
                      this.state.Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][this.state.cityChoice]["Subpopulations"],
                      "subpopulation",
                      FILTER_COLUMNS
                    )}
                    {...unshelteredCitiesStyling['Subpopulations']}
                  />
                </div>
                <div className="ct-side-r2">
                  <TableComponent4
                    data={filterList(
                      this.state.Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][this.state.cityChoice]["Age"],
                      "subpopulation",
                      ["Total"]
                    )}
                    {...unshelteredCitiesStyling['Age Table']}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-5 dash-col-com">
              <div className="ct-grid-center">
                <div className="ct-center-r1">
                  <div className="ct-center-r1c1">
                    <span className="component-header">
                      Chronically Homeless
                    </span>
                  </div>
                  <div className="ct-center-r1c2">
                    <span className="component-header">
                      Total Unsheltered Count
                    </span>
                  </div>
                  <div className="ct-center-r1c3">
                    <span className="component-header">
                      Percent of District
                    </span>
                  </div>

                  <div className="ct-center-r2c1">
                    <span className="component-header">
                      <Number height = {400}
                       url = {router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByCity/?search=homeless+' + this.state.cityChoice}
                      />
                    </span>
                  </div>
                  <div className="ct-center-r2c2">
                    <span className="component-header">
                      <Total height = {400}
                       url = {router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByCity/?search=Age+' + this.state.cityChoice}
                       />
                    </span>
                  </div>
                  <div className="ct-center-r2c3">
                  <span className="component-header">
                      <PercentageDistrict height = {400}
                       url = {router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByCity/?search=Age+' + this.state.cityChoice}
                       />
                    </span>
                  </div>
                </div>
                <div className="ct-center-r2">
                  <div>
                    <PieChart2
                      data={filterList(
                        this.state.Tables[
                          router.activeYear + "/SubpopulationsByCity"
                        ][this.state.cityChoice]["Ethnicity"],
                        "subpopulation",
                        ["Total"]
                      )}
                      margin={{ bottom: 60, top: 30, right: 60, left: 60 }}
                    />
                  </div>
                </div>
                <div className="ct-center-r3">
                  <BarGraph
                    data={filterList(
                      this.state.Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][this.state.cityChoice]["Race"],
                      "subpopulation",
                      ["Total"]
                    )}
                    {...unshelteredCitiesStyling['Race Chart']}
                  />
                </div>
              </div>
            </div>
            <div className="col-md dash-col-com">
              <div className="ct-grid-side">
                <div className="ct-side-r1r1">
                  <TableComponent4
                    data={filterList(
                      this.state.Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][this.state.cityChoice]["Gender"].sort( (a,b) => { return b.total - a.total}),
                      "subpopulation",
                      ["Total"]
                    )}
                    {...unshelteredCitiesStyling['Gender Table']}
                  />
                </div>
                <div className="ct-side-r1r2">
                    <BarGraph 
                    data = {filterList(this.state.Tables[router.activeYear + "/SubpopulationsByCity"][this.state.cityChoice]["Gender"], "subpopulation", ["Total"])}
                    // indexBy = {"subpopulation"}
                    // keys = {["interview"]}
                    // margin = {{top: 40, bottom:30, right: 30, left: 30}}
                    {...unshelteredCitiesStyling['Gender Chart']}
                    />
                </div>
                <div className="ct-side-r1r3">
                  <span></span>
                </div>
                <div className="ct-side-r1r4">
                  <TableComponent4
                    data={
                      this.state.Tables[
                        router.activeYear + "/SubpopulationsByCity"
                      ][this.state.cityChoice]["Race"].sort( (a,b) => { return b.total - a.total})
                    }
                    {...unshelteredCitiesStyling['Race Table']}
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
    return <div>{this.state.rendered ? this.runGraphs() : (
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )}</div>;
  }
}
