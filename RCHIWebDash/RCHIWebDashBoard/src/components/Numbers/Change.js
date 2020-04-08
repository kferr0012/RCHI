import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

export default class Change extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            url : this.props.url,
            height : this.props.height,
            mydata : [],
            number: 0,
        }

        this.runTotal = this.runTotal.bind(this)
    }



    async fetchData(){

        var self = this
        await fetch(this.state.url, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then((data) =>{
                this.setState({mydata:data})
            })
            .catch(err => {
                console.log("no data found")
            })

        console.log("data:")
        console.log(this.state.mydata)
    }

    async componentWillReceiveProps(){
        this.setState({url : this.props.url})
        await this.fetchData()
    }
    async componentWillMount(){
        await this.fetchData()
    }


    round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    runTotal(){

        let percent;
        let i;
        let totalNum = 0;

        for (i = 0; i < this.state.mydata.length; i++) {
          this.state.mydata[i].value = this.state.mydata[i].interview + this.state.mydata[i].observation;
          if(this.state.mydata[i].trend === 'Homeless Population ' && this.state.mydata[i].category === "Unsheltered" || this.state.mydata[i].category === "Sheltered"){
              totalNum = this.state.mydata[i].total;

          }
          if(this.state.mydata[i].year === "2020"){
              this.state.number = this.state.mydata[i].total;
          }
      }



      return (
        // (2020homelessCounts/2019Homelesscounts - 1) * 100
        <div className = "component-header" style = {{fontSize: "12px"}}>
             {((( 2912/2811 - 1)*100)).toFixed(0)}%
        </div>
     )






    }
    render() {
    //     return (
    //       <div style = {{height: this.state.height}}>
                
    //       {this.state.mydata ? this.runTotal(): null}
          
    //       <span className = "component-header">Increase in homeless count</span>
    //       <h6 style = {{color: "#aaaaaa"}}>From 2019</h6>
    //   </div>

        

    //     <span className = "component-header">Overall, {value}% increase in</span>
    //     <h6 style = {{color: "#aaaaaa"}}>homeless count from From 2019</h6>
    //     )


        return (
            <div style = {{height: this.state.height,  padding:0, marginBottom:0}}>
                <span className = "component-header" style = {{fontSize: "12px"}}>Overall, {((( 2912/2811 - 1)*100)).toFixed(0)}% increase in</span>
                <h6 style = {{color: "#aaaaaa" ,fontSize: "12px"}}>homeless count from From 2019</h6>
            </div>
        )
    }
}
