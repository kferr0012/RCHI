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
            districtCount: null,
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


        await fetch(this.props.districtUrl, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then((data) =>{
                this.setState({districtCount:data})
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
            let {city, total} = val
            if(city === this.props.cityChoice){
                return acc + total
            }
            return acc
        },0)

        var districtTotal = 0

        if (this.state.districtCount !== null) {
            districtTotal = this.state.districtCount.reduce((acc, val) => {
                let { year, total, district } = val

                if(year == this.props.activeYear){
                    if(this.props.dashboard === "Seniors" || this.props.dashboard === "Newly Homeless"){
                        if (district !== "1+2"){
                            return acc + total
                        }
                    }
                    else{
                        return acc + total
                    }
                }
                return acc
            }, 0)
        }

        console.log("TOTAL COUNT: ", totalCount)
        console.log("DISTRICT TOTAL: ", districtTotal)


        const percentage = ((totalCount / districtTotal) * 100)

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