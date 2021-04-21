import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table} from 'semantic-ui-react'
import TableComponent4 from '../../components/charts/TableComponent4'
import {router} from '../../components/Utilities/constants/routing'
import { filter } from '../../components/Utilities/ListManipulation/filter';

//CLEAN

//2021 data import
import {dashboardData} from '../../frontendData2021/districtDataDash1'

class PitCountByCity extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null,
      currentDistrict: 0,
    };
  }

  formatingData(){
    if(this.props.currentDistrict==1){
      this.setState({
        chartData : dashboardData[0],
        currentDistrict : this.props.clickedDistrict
      })
    }
    else{
      axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/CityTotalByYear/?search='+this.props.query)
        .then(response=>{

          const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 2 && index.city !== "Riverside")

          const formatData = filterData.map( value => {
            let {year, city, total} = value
            return { year: year, total: total, subpopulation:city}
          })
          this.setState({
            chartData : formatData,
            currentDistrict: this.props.clickedDistrict  
          })
        })
    }
  }

  componentDidMount(){
    this.formatingData()
  }

  componentDidUpdate(){
    if(this.props.clickedDistrict){
        if(this.state.chartData && this.props.clickedDistrict !== this.state.currentDistrict){
            this.formatingData()
        }
    }
}


  render(){
    return <div>
      {this.state.chartData ? <TableComponent4 
          data = {this.state.chartData}
          {...this.props}
        /> : 0}
    </div>
  }
}

export default PitCountByCity