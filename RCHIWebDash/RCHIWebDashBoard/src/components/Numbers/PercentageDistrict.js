import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

export default class PercentageDistrict extends React.Component {

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

            })
    }

    async componentWillReceiveProps(){
        this.setState({url : this.props.url})
        await this.fetchData()
    }
    async componentWillMount(){
        await this.fetchData()
    }

    runTotal(){

        const totalCount = this.state.mydata.reduce((acc, val) =>{
            let {subpopulation, interview, observation} = val
            if(subpopulation !="Total"){
                return acc + interview + observation
            }
            return acc
        },0)

        const percentage = ((totalCount / 2155) * 100)

        return (
            <div>
                {percentage < 1 && percentage != 0 ? "<1%" : Math.round(percentage).toString() +"%"}
            </div>
        )






    }
    render() {
        return (
            <div>
                {this.state.mydata ? this.runTotal(): null}
            </div>

        )
    }
}