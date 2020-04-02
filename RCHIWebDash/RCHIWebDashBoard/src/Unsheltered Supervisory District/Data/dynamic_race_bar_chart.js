import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts';
import axios from 'axios'

import { colors } from '../../components/Utilities/colors'
import {router} from '../../components/Utilities/constants/routing'


//Class Component
class Dynamic_Bar_Chart_Template extends Component{
  constructor(props){
    super();

    this.state = {
      chartData : null,
      currentDistrict:1
    }
  }

  formatingData(){
    axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByCity/?search='+ this.props.query)
      .then(response=>{
        const filter = response.data.filter(row => (row.subpopulation !== "Total" && row.category === "Race"))
        const new_data = {
          'Asian':0, 'American Indian':0, 'Black':0, 'White':0,
          'Multiple Races':0, 'Native Hawaiian':0, 'Unknown Race':0
        }

        for(let i = 0; i <filter.length; ++i){
          new_data[filter[i].subpopulation] += filter[i].interview + filter[i].observation
        }

        const result = Object.keys(new_data).map(key=>{
          return [key, new_data[key]]
        })


        this.setState({
          chartData : {

              //Set Template
              options: {
                chart: {
                  id:"bar"
                },
                xaxis:{
                  categories:result.map(result=>result[0])
                },
                colors: colors[2]
              },

              series:[
                {
                  name:"Total",
                  data: result.map(result=>result[1])
                }
              ]
          },
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
      return(
        <h3>Waiting for data</h3>
      )
    }
    //
    if(this.state.chartData){
      return(
        <div>
          <h3>{this.props.header}</h3>
          <Chart
            options={this.state.chartData.options}
            series={this.state.chartData.series}
            type="bar"
            // width="480"
          />
        </div>
    )
  }
  }
}

export default Dynamic_Bar_Chart_Template
