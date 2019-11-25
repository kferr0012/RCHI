import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

export default class Number extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            url : this.props.url,
            height : this.props.height,
            mydata : [],
            number: 0,
        }

        this.runNumber = this.runNumber.bind(this)
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

    runNumber(){

        let i;
        let totalValues = this.state.mydata;
        for (i = 0; i < this.state.mydata.length; i++) {
            this.state.mydata[i].value = this.state.mydata[i].interview + this.state.mydata[i].observation;
            if(this.state.mydata[i].subpopulation === 'Chronically Homeless'){
                this.state.number = this.state.mydata[i].value
            }

            delete this.state.mydata[i].subpopulation;

        }

        console.log(this.state.mydata);
        console.log(this.state.number);
        return (
            this.state.number
        )






    }
    render() {
        return (
            <div style = {{height: this.state.height}}>
                Number of Chronically Homeless
                <br/>
                {this.state.mydata ? this.runNumber(): null}
            </div>

        )
    }
}
