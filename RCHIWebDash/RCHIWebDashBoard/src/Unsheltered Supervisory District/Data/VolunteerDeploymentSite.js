import React, {Component} from 'react';
import axios from 'axios';
import { Header, Table, Container, Tab } from 'semantic-ui-react'
import {router} from '../../components/Utilities/constants/routing'
import TableComponent4 from '../../components/charts/TableComponent4'

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

        const newDataObject = response.data.reduce((acc,val) => {
            let {year, count, deploymentSite} =val
            if(!acc[deploymentSite]){
              acc[deploymentSite] = {year:year, total: 0}
            }
            acc[deploymentSite].total += count

            return acc
        }, {})

        const newDataArray = Object.entries(newDataObject).map(([key,value]) => {
          return {
            subpopulation: key,
            ...value
          }
        })

        this.setState({
          // chartData : this.TableRender(completeData.sort( (a,b) => { return b.values - a.values})),
          chartData : newDataArray.sort((a,b) => {return b.total - a.total}),
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
      {this.state.chartData ?
        <TableComponent4
          data = {this.state.chartData}
          {...this.props}
        />  : 0}
    </div>
  }
}

export default VolunteerDeploymentSite