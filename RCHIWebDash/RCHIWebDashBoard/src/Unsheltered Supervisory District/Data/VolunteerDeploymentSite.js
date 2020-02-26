import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table, Container, Tab } from 'semantic-ui-react'
import {router} from '../../components/Utilities/constants/routing'

//CLEAN


class VolunteerDeploymentSite extends Component{
  constructor(){
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
      axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/VolunteerDeployment/?search='+this.props.query)
      .then(response=>{
        
        const formatData = response.data.reduce((accumulator, currentValue) => {
            if(!accumulator[currentValue.deploymentSite]){
                accumulator[currentValue.deploymentSite] = {values: currentValue.count, labels: currentValue.deploymentSite}
            }
            return accumulator;
        }, [])

        const completeData = Object.keys(formatData).map(key=>{
            return formatData[key]
          })

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
                    Volunteers By Deployment Site
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

export default VolunteerDeploymentSite