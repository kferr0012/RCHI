import React, { Component } from 'react';

// from packages
import Select from 'react-select';
import { Grid, Paper } from '@material-ui/core';

// components
import Number from '../components/Numbers/Number';
import Total from '../components/Numbers/Total';
import PercentageDistrict from '../components/Numbers/PercentageDistrict';
import PieChart2 from '../components/charts/PieChart2';
import TableComponent4 from '../components/charts/TableComponent4.js';
import BarGraph from '../components/reformatedCharts/BarChart';

// helper functions
import {
  aggregateFetch,
  expandOnField
} from '../components/Utilities/ListManipulation/aggregateFetch';
import { filterList } from '../components/Utilities/ListManipulation/filter';
import { changeVals2020 } from '../components/Utilities/ListManipulation/changeValue';
import { pieDataManiTotal } from '../components/Utilities/ChartDataManipulation/pieDataManipulation';
import { router } from '../components/Utilities/constants/routing';

// styling
import { unshelteredCitiesStyling } from '../components/Utilities/styling/chartTablesStyling';
import './DottedBox.css';
import '../components/css/dash.css';

// constants
import { FILTER_COLUMNS, urls } from './constants';

export default class CityTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityChoice: 'RIVERSIDE', //set default city on first render
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
    return newData.sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      }
      if (b.label > a.label) {
        return -1;
      }
      return 0;
    });
  }

  reformatData(myTables) {
    //reformat 2019 data
    myTables[router.formerYear + '/GeneralTableSubpopulations'] = expandOnField(
      myTables[router.formerYear + '/GeneralTableSubpopulations'],
      'category'
    );
    myTables[
      router.formerYear + '/GeneralTableSubpopulationsSheltered'
    ] = expandOnField(
      myTables[router.formerYear + '/GeneralTableSubpopulationsSheltered'],
      'category'
    );
    myTables[router.formerYear + '/SubpopulationsByCity'] = expandOnField(
      myTables[router.formerYear + '/SubpopulationsByCity'],
      'city'
    );

    for (const key in myTables[router.formerYear + '/SubpopulationsByCity']) {
      myTables[router.formerYear + '/SubpopulationsByCity'][
        key
      ] = expandOnField(
        myTables[router.formerYear + '/SubpopulationsByCity'][key],
        'category'
      );
    }

    //reformat 2020 data
    myTables[router.activeYear + '/GeneralTableSubpopulations'] = expandOnField(
      myTables[router.activeYear + '/GeneralTableSubpopulations'],
      'category'
    );
    myTables[
      router.activeYear + '/GeneralTableSubpopulationsSheltered'
    ] = expandOnField(
      myTables[router.activeYear + '/GeneralTableSubpopulationsSheltered'],
      'category'
    );
    myTables[router.activeYear + '/SubpopulationsByCity'] = expandOnField(
      myTables[router.activeYear + '/SubpopulationsByCity'],
      'city'
    );

    for (const key in myTables[router.activeYear + '/SubpopulationsByCity']) {
      myTables[router.activeYear + '/SubpopulationsByCity'][
        key
      ] = expandOnField(
        myTables[router.activeYear + '/SubpopulationsByCity'][key],
        'category'
      );
    }

    return myTables;
  }
  async componentDidMount() {
    var myTables = await aggregateFetch(urls, false);

    this.setState({
      Tables: await this.reformatData(myTables),
      selectOptions: this.getOptions(
        Object.keys(myTables[router.activeYear + '/SubpopulationsByCity'])
      ).sort(),
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
      this.setState({
        cityChoice: value.value
      });
    }, 200);
  }

  title() {
    return (
      <div className="dashboard">
        <Paper variant="elevation" elevation={2}>
          <h1 className="dashboard-title">
            Sheltered - Cities
            <h6>
              <em>2021 RIVERSIDE COUNTY SHELTERED COUNT</em>
            </h6>
          </h1>
        </Paper>
      </div>
    );
  }

  runGraphs() {
    const { cityChoice, selectOptions, Tables } = this.state;
    const mainRoute = router.host + '/' + router.root + '/' + router.activeYear;

    return (
      <div className="container">
        <Grid container item spacing={3} md={12}>
          <Grid container md={12}>
            {this.title()}
          </Grid>
          <Grid container md={12}>
            <Grid item md={5} style={{ minWidth: '200px' }}>
              <Select
                options={selectOptions}
                defaultValue={cityChoice}
                placeholder={cityChoice}
                onChange={value => this.setCityChoice(value)}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" md={6} spacing={10}>
            <Grid item md={6}>
              <div className="ct-number" style={{ height: '90px' }}>
                <span className="component-header">
                  Percent of <br />
                  District{' '}
                  {
                    Tables[router.activeYear + '/SubpopulationsByCity'][
                      cityChoice
                    ]['Individuals'][0].district
                  }
                </span>
                <span className="component-header">
                  <PercentageDistrict
                    height={400}
                    url={
                      mainRoute +
                      '/SubpopulationsByCity/?search=Individuals+' +
                      cityChoice
                    }
                    districtUrl={
                      mainRoute +
                      '/CityTotalByYear/?search=' +
                      Tables[router.activeYear + '/SubpopulationsByCity'][
                        cityChoice
                      ]['Individuals'][0].district
                    }
                    activeYear={router.activeYear}
                    cityChoice={cityChoice}
                  />
                </span>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="ct-number" style={{ height: '90px' }}>
                <span className="component-header">Chronically Homeless</span>
                <span className="component-header">
                  <Number
                    height={400}
                    url={
                      mainRoute +
                      '/SubpopulationsByCity/?search=homeless+' +
                      cityChoice
                    }
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid container item spacing={5} md={12}>
            <Grid container item md={3}>
              <TableComponent4
                data={changeVals2020(
                  filterList(
                    Tables[router.activeYear + '/SubpopulationsByCity'][
                      cityChoice
                    ]['Subpopulations'],
                    'subpopulation',
                    FILTER_COLUMNS
                  )
                )}
                {...unshelteredCitiesStyling['Subpopulations']}
              />
            </Grid>
            <Grid container alignItems="center" item md={3}>
              <PieChart2
                data={pieDataManiTotal(
                  filterList(
                    Tables[router.activeYear + '/SubpopulationsByCity'][
                      cityChoice
                    ]['Race'],
                    'subpopulation',
                    ['Total']
                  )
                )}
                header={"Race"}
                margin={{ bottom: 60, top: 30, right: 60, left: 70 }}
                {...unshelteredCitiesStyling['Pie Chart']}
              />
            </Grid>
            <Grid container alignItems="center" item md={3}>
              <PieChart2
                data={pieDataManiTotal(
                  filterList(
                    Tables[router.activeYear + '/SubpopulationsByCity'][
                      cityChoice
                    ]['Ethnicity'],
                    'subpopulation',
                    ['Total']
                  )
                )}
                header={"Ethnicity"}
                margin={{ bottom: 60, top: 30, right: 60, left: 70 }}
                {...unshelteredCitiesStyling['Pie Chart']}
              />              
            </Grid>
            <Grid container  alignItems="center" item md={3}>            
              <PieChart2
                data={pieDataManiTotal(
                  filterList(
                    Tables[router.activeYear + '/SubpopulationsByCity'][
                      cityChoice
                    ]['Gender'],
                    'subpopulation',
                    ['Total']
                  )
                )}
                header={"Gender"}
                margin={{ bottom: 60, top: 30, right: 60, left: 70 }}
                {...unshelteredCitiesStyling['Pie Chart']}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={5} md={12}>
            <Grid item md={3}>
              <TableComponent4
                data={filterList(
                  Tables[router.activeYear + '/SubpopulationsByCity'][
                    cityChoice
                  ]['Living Situation'],
                  'subpopulation',
                  FILTER_COLUMNS
                ).sort((a, b) => {
                  return b.total - a.total;
                })}
                {...unshelteredCitiesStyling['Living Situation']}
              />
            </Grid>
            <Grid container item md={3}>
            <BarGraph
                data={filterList(
                  Tables[router.activeYear + '/SubpopulationsByCity'][
                    cityChoice
                  ]['Race'],
                  'subpopulation',
                  ['Total']
                )}
                header={"Race - Sheltered vs Census"}
                {...unshelteredCitiesStyling['Bar Graph']}
              />
            </Grid>
            <Grid item md={3}>
            <BarGraph
                data={filterList(
                  Tables[router.activeYear + '/SubpopulationsByCity'][
                    cityChoice
                  ]['Ethnicity'],
                  'subpopulation',
                  ['Total']
                )}
                header={"Ethnicity - Sheltered vs Census"}
                {...unshelteredCitiesStyling['Bar Graph']}
              />
            </Grid>
            <Grid item md={3}>
              <BarGraph
                data={filterList(
                  Tables[router.activeYear + '/SubpopulationsByCity'][
                    cityChoice
                  ]['Gender'],
                  'subpopulation',
                  ['Total']
                )}
                header={"Gender - Sheltered vs Census"}
                {...unshelteredCitiesStyling['Bar Graph']}
              />
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
