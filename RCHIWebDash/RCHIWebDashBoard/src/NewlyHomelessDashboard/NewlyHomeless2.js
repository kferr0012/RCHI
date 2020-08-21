import React, { Component } from 'react';
import { aggregateFetch } from '../components/Utilities/ListManipulation/aggregateFetch';
import '../components/css/dash.css';
import TableComponent4 from '../components/charts/TableComponent4';
import PieChart2 from '../components/charts/PieChart2';
import BarGraph from '../components/TestingBranch/BarGraph';
import BarChart from '../components/reformatedCharts/BarChart';
import PieChart from '../components/reformatedCharts/PieChart';
import { Header, Segment } from 'semantic-ui-react';
import { Card, Container, Grid } from '@material-ui/core';
import { filterList } from '../components/Utilities/ListManipulation/filter';
import { changeVals2020 } from '../components/Utilities/ListManipulation/changeValue';
import { pieDataManiTotal } from '../components/Utilities/ChartDataManipulation/pieDataManipulation';
import { router } from '../components/Utilities/constants/routing';
import {
  newlyHomelessStyling,
  ContainerWidth,
  seniorsUnshelteredStyling
} from '../components/Utilities/styling/chartTablesStyling';

import Total from '../components/Numbers/Total';
import PercentageDistrict from '../components/Numbers/PercentageDistrict';

const FILTER_COLUMNS = [
  'Veteran No',
  'No Substance Abuse',
  'Unknown Substance Abuse',
  'No PTSD',
  'Unknown PTSD',
  'No Mental Health Conditions',
  'Unknown Mental Health Conditions',
  'No Physical Disability',
  'Unknown Physical Disability',
  'No Developmental Disability',
  'Unknown Developmental Disability',
  'No Brain Injury',
  'Unknown Brain Injury',
  'Not Victim of Domestic Violence',
  'Unknown Victim of Domestic Violence',
  'No AIDS or HIV',
  'Unknown AIDS or HIV',
  'Jail Release 90 Days: Probation',
  'Jail Release 90 Days: Parole',
  'Jail Release 90 Days: Completed Sentence',
  'Jail Release 90 Days: (Unspecified)',
  'Jail Release 12 Months: Probation',
  'Jail Release 12 Months: Parole',
  'Jail Release 12 Months: Completed Sentence',
  'Jail Release 12 Months: (Unspecified)',
  'No Jail',
  'Unknown Jail',
  'Not Chronically Homeless',
  'Unknown Veteran',
  'Chronically Homeless',
  'Couch',
  'Individuals'
];

export default class NewlyHomelessGrid2 extends Component {
  constructor() {
    super();
    this.state = {
      urls: [
        `${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/`
      ],
      rendered: false,
      Tables: []
    };
  }

  async componentDidMount() {
    var Tables = await aggregateFetch(this.state.urls);
    this.setState({
      Tables: Tables,
      rendered: true
    });
  }

  title() {
    // Page Banner
    return (
      <div style={{ width: '100%' }}>
        <Segment>
          <Header as='h1' textAlign='center'>
            Unsheltered - Newly Homeless
            <h3>
              <strong>Interview Only</strong>
            </h3>
            <h6>
              <em>First time homeless within 12 months</em>
            </h6>
            <Header sub> 2020 Riverside County Pit Count</Header>
          </Header>
        </Segment>
      </div>
    );
  }

  dashboard() {
    return (
      <div className='container'>
        <Grid container spacing={3}>
          <Grid container item xs={12}>
            {/* Title */}
            {this.title()}
          </Grid>

          <Grid container xs={4}>
            {/* Age Table, sorted and showing percentage */}
            <Grid item xs={12}>
              <TableComponent4
                data={changeVals2020(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/NewlyHomelessByCity`
                    ]['Age'],
                    'subpopulation',
                    FILTER_COLUMNS
                  )
                ).sort((a, b) => b.total - a.total)}
                percentage_flag={1}
                tableName='Age'
                height='120%'
                {...newlyHomelessStyling['Age']}
              />
            </Grid>

            {/* Living Situation Table, sorted and showing percentage */}
            <Grid item xs={12}>
              <TableComponent4
                data={filterList(
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    'Living Situation'
                  ],
                  'subpopulation',
                  FILTER_COLUMNS
                ).sort((a, b) => b.total - a.total)}
                percentage_flag={1}
                {...newlyHomelessStyling['Living Situation']}
              />
            </Grid>
          </Grid>

          <Grid container item xs={4}>
            {/* Number of Total Unsheltered */}
            <Grid container item xs={6} className='seniorNumbers'>
              <Grid item xs={12}>
                <span className='component-header'>Total Unsheltered</span>
              </Grid>
              <Grid item xs={12}>
                <span className='component-header'>
                  <Total
                    url={`${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/?search=Individuals`}
                    cityChoice={''}
                    height={400}
                  />
                </span>
              </Grid>
            </Grid>
            {/* Percent of Unsheltered are Seniors*/}
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <span className='component-header'>
                  Percentage of Unsheltered
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className='component-header'>
                  <PercentageDistrict
                    url={`${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/?search=Individuals`}
                    districtUrl={`${router.host}/${router.root}/${router.activeYear}/CityTotalByYear/`}
                    activeYear={router.activeYear}
                    cityChoice={''}
                    dashboard={'Newly Homeless'}
                  />
                </span>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {/* Ethnicity Pie Chart  */}
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/NewlyHomelessByCity`
                    ]['Ethnicity'],
                    'subpopulation',
                    ['Total']
                  )
                )}
                {...newlyHomelessStyling['Ethnicity']}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Gender Pie Chart */}
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/NewlyHomelessByCity`
                    ]['Gender'],
                    'subpopulation',
                    ['Total']
                  ),
                  newlyHomelessStyling['Gender'].percentage
                )}
                {...newlyHomelessStyling['Gender']}
              />
            </Grid>
          </Grid>

          <Grid container item xs={4}>
            {/* Subpopulation Statistics Table */}
            <TableComponent4
              data={changeVals2020(
                filterList(
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    'Subpopulations'
                  ],
                  'subpopulation',
                  FILTER_COLUMNS
                )
              )}
              tableName='Subpopulation Statistics'
              percentage_flag={1}
              individuals_row={null}
              {...newlyHomelessStyling['Subpopulations']}
            />
          </Grid>

          {/* Race Barchart */}
          <Grid container item xs={8}>
            <Card
              variant='outlined'
              style={{ width: '100%' }}
              className='seniorTable'>
              <BarChart
                data={filterList(
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    'Race'
                  ],
                  'subpopulation',
                  ['Total']
                )}
                {...newlyHomelessStyling['Race']}
              />
            </Card>
          </Grid>
          {/* Household Composition */}
          <Grid container item xs={4}>
            <Card
              variant='outlined'
              style={{ width: '100%' }}
              className='seniorTable'>
              <TableComponent4
                data={
                  this.state.Tables[`${router.activeYear}/NewlyHomelessByCity`][
                    'Households'
                  ]
                }
                {...newlyHomelessStyling['Household']}
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
          <div class='lds-ring'>
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
