import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table} from 'semantic-ui-react'
import TableComponent4 from '../../components/charts/TableComponent4'
import {router} from '../../components/Utilities/constants/routing'
import { filter } from '../../components/Utilities/ListManipulation/filter';

//CLEAN


class PitCountByCity extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null,
      currentDistrict: 0,
    };
  }

  formatingData(){
    axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/CityTotalByYear/?search='+this.props.query)
      .then(response=>{

        const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 2)

        const formatData = filterData.map( value => {
          let {year, city, total} = value
          return { year: year, total: total, subpopulation:city}
        }).sort((a,b) => {return b.total - a.total})

        this.setState({
          chartData : formatData,
          currentDistrict: this.props.clickedDistrict  
        })
      })
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