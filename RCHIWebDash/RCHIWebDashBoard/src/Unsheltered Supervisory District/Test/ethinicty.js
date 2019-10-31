import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts';
import axios from 'axios'

//CLEAN

//Class Component
class Dynamic_Ethnicity_Pie_Chart_Template extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null
    };
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/SubpopulationsByCity2019/?search=1,Ethinicity')
      .then(response=>{
        const filter = response.data.filter(row => (row.subpopulation !== "Total" && row.city !== "RIVERSIDE"))
        const new_data = {
          'Unknown Ethinicity':0, 'Hispanic':0, 'NonHispanic':0,
        }


        for(let i = 0; i <filter.length; ++i){
          new_data[filter[i].subpopulation] += filter[i].interview + filter[i].observation
        }

        // console.log(new_data)



        const result = Object.keys(new_data).map(key=>{
          return [key, new_data[key]]
        })

        // console.log(result)

        this.setState({
          chartData : {
              series: result.map(result=>result[1]),
              labels: result.map(result=>result[0]),
              legend: {
                  show: true,
                  floating: false,
                  position :'bottom',

              },
              colors:["#948F95","#DF7CF3","#58B6EC"],
          }
        })
      })
  }

  render(){
    //FIXME
    if(!this.state.chartData){
      return <h3>Waiting for Data</h3>
    }
    else{
      return(
        <div>
          <h3>Ethnicity</h3>
          <Chart
            options={this.state.chartData}
            series={this.state.chartData.series}
            type="pie"
            width="400"
          />
        </div>
      )
    }
  }
}


//Simple Components
//Export Statement
export default Dynamic_Ethnicity_Pie_Chart_Template