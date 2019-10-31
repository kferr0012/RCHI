import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table} from 'semantic-ui-react'

//CLEAN


class PitCountByCity extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null,
      currentDistrict:1
    };
  }

  formatingData(){
    axios.get('http://localhost:8000/api/CityTotalByYear/?search='+this.props.query)
      .then(response=>{
        
        const formatData = response.data.reduce((accumulator, currentValue) => {
            if(!accumulator[currentValue.city]){
                accumulator[currentValue.city] = {'2018': 0, '2019': 0, labels: currentValue.city}
            }
            if(currentValue.year == '2018') accumulator[currentValue.city][2018] += currentValue.total
            if(currentValue.year == '2019') accumulator[currentValue.city][2019] += currentValue.total
            return accumulator;
        }, {})
        const completeData = Object.keys(formatData).map(key=>{
            return formatData[key]
          })

        this.setState({
          chartData : this.TableRender(completeData)  
        })
      })
  }

    TableRender = (data) => {
        return data.map( (index,i) => (
            <Table.Row key={i}>
                <Table.Cell>{index.labels}</Table.Cell>
                <Table.Cell>{index[2018]}</Table.Cell>
                <Table.Cell>{index[2019]}</Table.Cell>
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
                <Header>
                    PIT Count By City
                    <Header.Subheader></Header.Subheader>
                </Header>
            </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>2018</Table.HeaderCell>
            <Table.HeaderCell>2019</Table.HeaderCell>
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