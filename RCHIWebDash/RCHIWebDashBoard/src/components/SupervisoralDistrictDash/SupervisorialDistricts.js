import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Papa from 'papaparse'
import SupervisorialDistrictsHeader from './SupervisorialDistrictsHeader';
import SupervisorialDistrictDash from './SupervisorialDistrictDash'

export default class SupervisorialDistricts extends Component {
	constructor(props){
        super(props);
        this.state = {
            dataFinished: 0,
            districtData: [ [{},{}], [{},{}], [{},{}], [{},{}], [{},{}] ],
			PIT_Count_Trends: [ {}, {}, {}, {} , {}],
			City_Counts: [ [], [], [], [] , []],
          };
		this.updateData = this.updateData.bind(this);
    }
    
    componentWillMount() {
		/* 
			When its determined that the component will mount this parses all the csvs needed for the Supervisorial Districts and places them into state
		*/
        var csvFilePath = require("./DistrictDashData/DistrictBreakdown.csv");
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
        });

		csvFilePath = require("./DistrictDashData/PIT_Count_2015-2019.csv");
		Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
		});
		
		csvFilePath = require("./DistrictDashData/PIT_Count_By_District_By_City.csv");
		Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
        });
    }

    updateData(csvData) {
		const data = csvData.data;
		/* 
			this.state.dataFinished is just to check at which point we are in the data parsing
		*/
        if (this.state.dataFinished == 0)
        {
			var tempArr = [ [{},{}], [{},{}], [{},{}], [{},{}], [{},{}] ] ;
			var year = 0;
			for (var i = 0; i < 10; i++)
			{
				year = 0;
				if (data[i]['Year'] == '2019')
				{ 	year = 1;	}

				tempArr[ data[i]['District'] - 1][year] = data[i];
			}
			this.setState({districtData: tempArr});
			this.setState({dataFinished: 1});
        }
        else if (this.state.dataFinished == 1)
        {
			var tempArr = [ {}, {}, {}, {}, {} ];
			for (var i = 0; i < 5; i++)
			{
				tempArr[parseInt(data[i].District)-1] = data[i];
			}
			this.setState({PIT_Count_Trends: tempArr});
			this.setState({dataFinished: 2});
		}
		else if (this.state.dataFinished == 2)
		{
			var tempArr = [ [], [], [], [], [] ];
			for (var i = 0; i < data.length; i++)
			{
				tempArr[parseInt(data[i].District)-1].push(data[i]);
			}
			this.setState({City_Counts: tempArr});
			this.setState({dataFinished: 3});
		}
	}
	render() { // Passes in the different props to each Route
		return (
			<Switch>
				<Route exact path='/SupervisorialDistricts' component={SupervisorialDistrictsHeader}/>
				<Route path='/SupervisorialDistricts/1' render = { (props) => (
					<SupervisorialDistrictDash {...props} District_Num={1} City_Counts={this.state.City_Counts[0]} PIT_Count_Trends={this.state.PIT_Count_Trends[0]} data2018={ this.state.districtData[0][0] } data2019={ this.state.districtData[0][1] }/>
				)}/>
				<Route path='/SupervisorialDistricts/2' render = { (props) => (
					<SupervisorialDistrictDash {...props} District_Num={2} City_Counts={this.state.City_Counts[1]} PIT_Count_Trends={this.state.PIT_Count_Trends[1]} data2018={ this.state.districtData[1][0] } data2019={ this.state.districtData[1][1] }/>
				)}/>
				<Route path='/SupervisorialDistricts/3' render = { (props) => (
					<SupervisorialDistrictDash {...props} District_Num={3} City_Counts={this.state.City_Counts[2]} PIT_Count_Trends={this.state.PIT_Count_Trends[2]} data2018={ this.state.districtData[2][0] } data2019={ this.state.districtData[2][1] }/>
				)}/>
				<Route path='/SupervisorialDistricts/4' render = { (props) => (
					<SupervisorialDistrictDash {...props} District_Num={4} City_Counts={this.state.City_Counts[3]} PIT_Count_Trends={this.state.PIT_Count_Trends[3]} data2018={ this.state.districtData[3][0] } data2019={ this.state.districtData[3][1] }/>
				)}/>
				<Route path='/SupervisorialDistricts/5' render = { (props) => (
					<SupervisorialDistrictDash {...props} District_Num={5} City_Counts={this.state.City_Counts[4]} PIT_Count_Trends={this.state.PIT_Count_Trends[4]} data2018={ this.state.districtData[4][0] } data2019={ this.state.districtData[4][1] }/>
				)}/>
			</Switch>
		);
  	}
}