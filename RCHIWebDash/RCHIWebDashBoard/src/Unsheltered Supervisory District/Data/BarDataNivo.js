import React, { Component } from 'react'
import axios from 'axios'

import NivoBarChart from '../../components/Utilities/GraphTypes/NivoBar'
import {router} from '../../components/Utilities/constants/routing'

class BarData extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: null
        }
    }

    componentDidMount(){
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByCity/?search=1,race')
            .then(response => {
                
                const filterData = response.data.filter(index => (index.subpopulation !== "Total" && index.city !== "RIVERSIDE"))

                var pleaseWork ={}
                const new_data = [
                   { 'Asian':0,} ,{'American Indian':0}, {'Black':0}, {'White':0},
                    {'Multiple Races':0}, {'Native Hawaiian':0}, {'Unknown Race':0}
                ]

                console.log(new_data.map(index => {
                    console.log("dafdafsad ", index)

                    pleaseWork = {label: "Asian", index}
                }))

                console.log("Pleas work: ", pleaseWork)

                  for(let i = 0; i <filterData.length; ++i){
                      
                    new_data[filterData[i].subpopulation] += filterData[i].interview + filterData[i].observation

                    console.log("datasfasfs: ", new_data[filterData[i].subpopulation])

                    // var obj = {label: Object.keys(new_data[filterData[i].subpopulation]}
                  }

                //   const completeData = new_data.map( index => {
                //       console.log("data inside complete: ", index)
                //       return {}
                //   })

                  const result = Object.keys(new_data).map(key=>{
                    return [key, new_data[key]]
                  })
          
                  console.log("Bar data: ", result)

                // const formatData = filterData.reduce((accumulator, currentValue) => {
                //     if(!new_data[currentValue.subpopulation]){
                //         new_data[currentValue.subpopulation] = {"total": 0}
                //     }
                //     accumulator[currentValue.subpopulation]["total"] += currentValue.interview + currentValue.observation
                //     return accumulator;
                // }, [])

                // const completeData = Object.keys(formatData).map(key=>{
                //     var obj = {}
                //     obj[key] = formatData[key].total

                //     const jsonString = JSON.stringify(obj)
                //     console.log("Json String: ",  JSON.stringify(obj))

                //     return  {labels:key ,jsonString}
                //   })



                // this.setState({
                //      chartData: completeData
                // })
            })
    }

    render(){
        if(!this.state.chartData){
            return <h1></h1>
        }
        if(this.state.chartData){
            return(
                    <NivoBarChart  subHeader={this.props.subHeader} header={this.props.header} data={this.state.chartData}/>
            )
        }
    }
}

export default BarData