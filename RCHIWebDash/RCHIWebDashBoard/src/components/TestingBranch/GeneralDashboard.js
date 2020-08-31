// General Sheltered and Unsheltered Dashboard

import React, { Component } from 'react';
import { router } from '../../components/Utilities/constants/routing';

import LineGraph from '../charts/LineGraph';
import PieChart2 from '../charts/PieChart2';
import PieChart from '../../components/reformatedCharts/PieChart';
import BarChart from '../../components/reformatedCharts/BarChart';
import TableComponent4 from '../charts/TableComponent4';

import { changeVals2020 } from '../../components/Utilities/ListManipulation/changeValue';
import NumberPercentage from '../Numbers/NumberPercentage';
import Change from '../Numbers/Change';
import TotalGeneral from '../Numbers/TotalGeneral';

import {
  pieDataManiTotal,
  pieDataManiInterview
} from '../Utilities/ChartDataManipulation/pieDataManipulation';
import {
  aggregateFetch,
  expandOnField
} from '../../components/Utilities/ListManipulation/aggregateFetch';
import {
  orderSubs,
  filterList,
  NumberCreator
} from '../../components/Utilities/ListManipulation/filter';
import { genSubpopOrder } from './constants';

import '../css/dash.css';
import { Header, Segment } from 'semantic-ui-react';
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Card
} from '@material-ui/core';

const FILTER_COLUMNS = [
  'Total',
  'Not Veteran',
  'Veteran No',
  'Unknown Veteran',
  'No Substance Abuse',
  'Unknown Substance Abuse',
  'PTSD',
  'No PTSD',
  'Unknown PTSD',
  'No Mental Health Conditions',
  'Unknown Mental Health Conditions',
  'Physical Disability',
  'No Physical Disability',
  'Unknown Physical Disability',
  'Developmental Disability',
  'No Developmental Disability',
  'Unknown Developmental Disability',
  'Brain Injury',
  'No Brain Injury',
  'Unknown Brain Injury',
  'Victim of Domestic Violence',
  'Not Victim of Domestic Violence',
  'Unknown Victim of Domestic Violence',
  'AIDS or HIV',
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
  'Chronically Homeless	447',
  'Not Chronically Homeless',
  'Couch'
];

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
          <h1 className="dashboard-title">
            General Sheltered and Unsheltered Information
            <p className="subheader"> 2020 Riverside County Pit Count</p>
          </h1>
        </Paper>
      </div>
    );
  }

  dashboard() {
    return (
      <div className='container'>
        <Grid container item spacing={3}>
          <Grid container item md={12}>
            {this.title()}
          </Grid>
          <Grid container md={6}>
            <Grid item md={12}>
              {/* Subpopulation table for unsheltered and sheltered */}
              <div className='change-label'>
                <Change
                  // height={15}
                  height={40}
                  url={`${router.host}/${router.root}'/Trends/?search=2020`}
                />
              </div>
              <TableComponent4
                data={orderSubs(
                  changeVals2020(
                    filterList(
                      this.getOrderedTable(),
                      'subpopulation',
                      FILTER_COLUMNS
                    )
                  ),
                  genSubpopOrder,
                  3
                )}
                expandIndex={'_type'}
                header={true}
                height={'100%'}
                // position='absolute'
              />
            </Grid>
            <Grid container item md={12}>
              {/* Race Bar Graph */}
              <p className='component-header'>
                Race
                <p className='component-subheader'>Total Count </p>
              </p>
              <BarChart
                data={filterList(
                  this.state.Tables[
                    `${router.activeYear}/GeneralTableSubpopulationsTotalCounts`
                  ]['Race'],
                  'subpopulation',
                  ['Total']
                )}
                indexBy={'subpopulation'}
                keys={['total']}
                margin={{ top: 5, right: 30, bottom: 50, left: 50 }}
                divHeight={'15em'}
                tickValues={4}
                gridYValues={4}
                maxValue={2000}
              />
            </Grid>
            <Grid container item md={6}>
              {/* Gender pie chart */}
              <p className='component-header'>
                Gender
                <p className='component-subheader'>Total Count </p>
              </p>
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/GeneralTableSubpopulationsTotalCounts`
                    ]['Gender'],
                    'subpopulation',
                    ['Total']
                  ),
                  0.1
                )}
                margin = {{top: 20, bottom: 40, left: 40, right: 40}}
                divHeight={'16em'}
                sortByValue={true}
                percentage={0.25}
              />
            </Grid>
            <Grid container item md={6}>
              {/* Ethnicity pie chart*/}
              <p className='component-header'>
                Ethnicity
                <p className='component-subheader'>Total Count </p>
              </p>
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      `${router.activeYear}/GeneralTableSubpopulationsTotalCounts`
                    ]['Ethnicity'],
                    'subpopulation',
                    ['Total']
                  ),
                  0.1
                )}
                margin = {{top: 20, bottom: 40, left: 40, right: 40}}
                divHeight={'16em'}
                sortByValue={true}
                percentage={0.25}
              />
            </Grid>
          </Grid>
          <Grid container item md={6} spacing={1}>
            <Grid container item md={12}>
              {/* Homeless Population Trend Graph*/}
              <span className='component-header'>
                Homeless Population Trend
              </span>
              <div className='homeless-population-trend' style={{position: 'relative'}}>
                <LineGraph
                  margin={{ top: 20, right: 30, bottom: 70, left: 30 }}
                  max={4000}
                  tickValues={4}
                  gridYValues={4}
                />
              </div>
            </Grid>
            <Grid container item md={12} className='grey-box'>
              <Grid container item md={4}>
                <Grid item md={12}>
                  {/* Mental health issues percent */}
                  <NumberPercentage
                    height={50}
                    data={this.state.NumberValues}
                    subpopulation={'Mental Health Conditions'}
                    header={'mental health issues'}
                  />
                </Grid>
                <Grid item md={12}>
                  {/* substance abuse issues percent */}
                  <div className="number-percentage">
                    <NumberPercentage
                      height={50}
                      data={this.state.NumberValues}
                      subpopulation={'Substance Abuse'}
                      header={'substance abuse'}
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  {/* physical disability issues percent*/}
                  <div className="number-percentage">
                    <NumberPercentage
                      height={50}
                      data={this.state.NumberValues}
                      subpopulation={'Physical Disability'}
                      header={'physical disability'}
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  {/* ptsd percent*/}
                  <div className="number-percentage">
                    <NumberPercentage
                      height={50}
                      data={this.state.NumberValues}
                      subpopulation={'PTSD'}
                      header={'PTSD'}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container item md={4} spacing={1}>
                <Grid container item md={12}>
                  {/* Total unsheltered count */}
                  <span>
                    <div style={{ fontSize: '40px', textAlign: 'middle' }}>
                    <TotalGeneral
                      data={this.state.NumberValues}
                      subpopulation={'Individuals'}
                      height={50}
                    />
                    </div>
                    <span className='component-header'>
                      Total Unsheltered Count
                    </span>
                  </span>
                </Grid>
                <Grid item md={12}>
                  {/* interview/observational table */}
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Interview</TableCell>
                          <TableCell align='right'>
                            {' '}
                            {this.state.NumberValues['Individuals'].interview}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Observational</TableCell>
                          <TableCell align='right'>
                            {' '}
                            {this.state.NumberValues['Individuals'].observation}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid container item md={12}>
                  {/* household composition table */}
                  <TableComponent4
                    data={filterList(
                      this.state.Tables[
                        `${router.activeYear}/GeneralTableSubpopulations`
                      ]['Households'],
                      'subpopulation',
                      ['Total']
                    )}
                    header={false}
                    tableHeight={'100%'}
                    divHeight={'12.0em'}
                    tableName={'Household Composition'}
                    padding={15}
                  />
                </Grid>
              </Grid>

              <Grid container item md={4}  spacing={1}>
                  <Grid container item md={12}>
                    <div className="living-situation-pie-chart">
                      {/* living situations pie chart */}
                      <Header size='small' textAlign='center'>
                        Living Situations
                        <br />
                        <span style={{ color: 'grey', fontSize: '12px' }}>
                          Interview Only{' '}
                        </span>
                      </Header>
                        <PieChart2
                          data={pieDataManiInterview(
                            filterList(
                              this.state.Tables[
                                `${router.activeYear}/GeneralTableSubpopulations`
                              ]['Living Situation'],
                              'subpopulation',
                              ['Couch']
                            ),
                            0.1
                          )}
                          margin = {{top:0,bottom:20,left:60, right: 60}}
                          enableRadialLabels={true}
                          percentageFilter={0.1}
                          height={'12em'}
                          truncate={true} 
                          position={'relative'}
                        />
                      </div>
                  </Grid>
      
                <Grid container item md={12}>
                  {/*living situations table*/}
                  <TableComponent4
                    data={filterList(
                      this.state.Tables[
                        `${router.activeYear}/GeneralTableSubpopulations`
                      ]['Living Situation'],
                      'subpopulation',
                      ['Couch']
                    ).sort((a, b) => {
                      return b.total - a.total;
                    })}
                    header={false}
                    percentage_flag={true}
                    height={'100%'}
                    padding={10}
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
