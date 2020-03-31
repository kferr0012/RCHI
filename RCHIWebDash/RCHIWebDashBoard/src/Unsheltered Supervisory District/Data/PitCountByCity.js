import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table} from 'semantic-ui-react'
import {router} from '../../components/Utilities/constants/routing'

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
        
        const formatData = filterData.reduce((accumulator, currentValue) => {
            if(!accumulator[currentValue.city]){
                accumulator[currentValue.city] = {'2019': 0, '2020': 0, labels: currentValue.city}
            }
            if(currentValue.year == '2019') accumulator[currentValue.city][2019] += currentValue.total
            if(currentValue.year == '2020') accumulator[currentValue.city][2020] += currentValue.total
            return accumulator;
        }, {})
        const completeData = Object.keys(formatData).map(key=>{
            return formatData[key]
          })
        
          // console.log("PIT DTA: ", completeData.sort( (a,b) => { return (b['2019'] + b['2020']) - (a['2019'] + a['2020'])}))
        this.setState({
          chartData : this.TableRender(completeData.sort( (a,b) => { return (b['2019'] + b['2020']) - (a['2019'] + a['2020'])})),
          currentDistrict: this.props.clickedDistrict  
        })
      })
  }

    TableRender = (data) => {
        return data.map( (index,i) => (
            <Table.Row key={i}>
                <Table.Cell className="SDPitCountCityTableCell">{index.labels}</Table.Cell>
                <Table.Cell className="SDPitCountCityTableCell">{index[2019]}</Table.Cell>
                <Table.Cell className="SDPitCountCityTableCell">{index[2020]}</Table.Cell>
            </Table.Row>   
        ))
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
    if(!this.state.chartData){
      return <h3>Waiting for Data</h3>
    }
    else{
      return(
        <Table celled structured >
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='3' textAlign='center'>
                <Header className="SDPitCountCityTableHeader">
                    PIT Count By City
                    <Header.Subheader></Header.Subheader>
                </Header>
            </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
            <Table.HeaderCell className="SDPitCountCityHeaderCell">City</Table.HeaderCell>
            <Table.HeaderCell className="SDPitCountCityHeaderCell">2019</Table.HeaderCell>
            <Table.HeaderCell className="SDPitCountCityHeaderCell">2020</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {this.state.chartData}
        </Table.Body>
    </Table>
      )
    }
  }
}

export default PitCountByCity