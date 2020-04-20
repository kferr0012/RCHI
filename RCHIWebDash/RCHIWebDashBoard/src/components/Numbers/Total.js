import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

export default class Total extends React.Component {

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

        var totalCount = 0

        if(this.props.cityChoice !== ""){
            totalCount = this.state.mydata.reduce((acc, val) =>{
                let {city, total} = val
                if(city === this.props.cityChoice){
                    return acc + total
                }
                return acc
            },0)
        }
        else{
            totalCount = this.state.mydata.reduce((acc, val) =>{
                let {total} = val
                return acc + total
            },0)
        }

        return (
            totalCount
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
