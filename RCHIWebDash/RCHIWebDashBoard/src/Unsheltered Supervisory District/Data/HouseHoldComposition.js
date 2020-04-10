import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table} from 'semantic-ui-react'
import {router} from '../../components/Utilities/constants/routing'
import TableComponent4 from '../../components/charts/TableComponent4'
import {  filterTypeAndYear } from '../../components/Utilities/ListManipulation/filter'

//CLEAN


class HouseHoldComposition extends Component{
  constructor(props){
    super();

    this.state = {
      chartData : null,
      currentDistrict:1
    };
  }

    TableRender = (data) => {
        return data.map( (index,i) => (
            <Table.Row key={i}>
                <Table.Cell>{index.labels}</Table.Cell>
                <Table.Cell>{index.values}</Table.Cell>
            </Table.Row>   
        ))
    }

  formatingData(){

    axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/HouseholdsByCityYearInterview/?search='+this.props.query)
    .then(response=>{
        
        const newDataObject = response.data.reduce ((acc, val) => {
          let {totalHouseholds, adultsOnly,  childrenOnly, adultsAndChildren} = val
          if(!acc["Total"]){ 
            acc["Total"] = {total: 0} 
            acc["Adults Only"] = {total: 0}
            acc["Adults and Children"] = {total: 0}
            acc["Children Only"] = {total: 0}}
          acc["Total"].total += totalHouseholds
          acc["Adults Only"].total += adultsOnly
          acc["Adults and Children"].total += adultsAndChildren
          acc["Children Only"].total += childrenOnly
          return acc
        }, {})

        const newDataArray = Object.entries(newDataObject).map(([key,value]) => {
          return{
            subpopulation: key,
            ...value
          }
        }).sort( (a,b) => {return b.total - a.total})

        this.setState({
          chartData : newDataArray,
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

export default HouseHoldComposition