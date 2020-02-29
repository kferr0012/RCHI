import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table} from 'semantic-ui-react'
import {router} from '../../components/Utilities/constants/routing'

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

    console.log("HOUSEHOLD COMPOSITION")
    axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/HouseholdsByCityYearInterview/?search='+this.props.query)
      .then(response=>{
        const filter = response.data
        console.log("HOUSEHOLD response:")
        console.log(response)
        
        const new_data = {
          'adultsOnly':0, 'adultsAndChildren':0, 'childrenOnly':0
        }

        for(let i = 0; i <filter.length; ++i){

          // new_data[filter[i].subpopulation] += filter[i].interview + filter[i].observation

          new_data['adultsOnly']+= filter[i].adultsOnly;
          new_data['adultsAndChildren']+= filter[i].adultsAndChildren;
          new_data['childrenOnly']+= filter[i].childrenOnly;
        }

        var clean_data = {}
        clean_data['Total Households Interviewed'] = new_data['adultsOnly'] + new_data['adultsAndChildren'] + new_data['childrenOnly']
        clean_data['Adults Only'] = new_data['adultsOnly']
        clean_data['Adults and Children'] = new_data['adultsAndChildren']
        clean_data['Children Only'] = new_data['childrenOnly']


        
        const completeData = Object.keys(clean_data).map(key=>{
          return {labels: key, values:clean_data[key]}
        })   
        console.log("HOUSEHOLD completeData: ")
        console.log(completeData)
        this.setState({
          chartData : this.TableRender(completeData),
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
    if(!this.state.chartData){
      return <h3>Waiting for Data</h3>
    }
    else{
      return(
        <Table celled structured>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='2' textAlign='center'>
                <Header>
                    Household Composition
                    <Header.Subheader>Interview Only</Header.Subheader>
                </Header>
                </Table.HeaderCell>
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

export default HouseHoldComposition