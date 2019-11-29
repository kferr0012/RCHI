import React from 'react';
import LineGraph from '../charts/LineGraph';
import BarChart from '../charts/BarChart';
import '../css/dash.css';

export default class Dashboard extends React.Component {
  render() {
    return(
      <div className="container my-2">
        <h2>General Sheltered and Unsheltered Information</h2>
        <div className="row dash-row">
          <div className="col-md dash-col-reg">
            <p className="component-header">Overall 21% increase in homeless count from 2018.</p>
            <h6>(enter table here)</h6>
          </div>
          <div className="col-md dash-col-reg">
            <span className="component-header">Homeless Population Trend</span>
            <LineGraph />
          </div>
        </div>
        <div className="row dash-row" style={{height: '500px'}}>
          <div className="col-md dash-col-big">
            <div className="custom-grid">
              <div className="custom-r1">
                <p className="component-header">Race and Ethnicity</p>
                <h6>(enter bar chart here)</h6>
              </div>
              <div className="custom-r2">
                <div className="custom-r2c1">
                  <p className="component-header">Gender</p>
                  <h6>(enter pie chart here)</h6>
                </div>
                <div className="custom-r2c2">
                  <h6>(enter pie chart here)</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md dash-col-big">
            <p className="component-header">Unsheltered Only Demographic</p>
            <h6>(enter component here)</h6>
          </div>
        </div>
      </div>
    );
  }
}