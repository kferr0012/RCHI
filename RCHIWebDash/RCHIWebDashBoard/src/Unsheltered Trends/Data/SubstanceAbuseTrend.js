import React, { Component } from 'react'
import axios from 'axios'

import NivoLineChart from '../../components/Utilities/GraphTypes/NivoLine'
import {router} from '../../components/Utilities/constants/routing'
//! Rewrite this script


class SubstanceAbuseGraph extends Component {
    constructor(){
        super();
        this.state = {
            chartData:null
        }
    }


    collectData = (category , data) => {

            return data
                .filter(i => i.subpopulation === category)
                    .map(j => {
                        return {
                            x : j.year,
                            y : j.total
                        }
                    })
        }


    componentDidMount(){

        console.log("SUBSTANCE ABUSE TREND: ")
        axios.get(router.host + '/' + router.root + '/' + router.activeYear + '/SubpopulationsByYear/?search='+ this.props.query)
            .then(response => {

                var completeData = []

                const filterData = response.data.filter(index => index.sheltered === false && index.year > router.activeYear - 5)
                const categories = ['Alcohol Abuse', 'Drug Abuse', 'Substance Abuse']
                console.log("[RESPONSE DATA]: ", filterData)

                for(var i =0 ; i<categories.length; i++){
                    if(categories[i] === "Substance Abuse"){
                        // const nullYear = [{x: 2016, y: null},{x: 2017, y: null}, {x: 2018, y: null},{x: 2019, y: 600},{x: 2020, y: 700}]
                        const newData = this.collectData(categories[i], filterData)
                        // console.log("CONCAT DATA: ", nullYear.concat(newData))
                        // console.log("NULL YEAR:", nullYear)
                        // console.log("{NEW DATA}: ", newData)
                        // completeData.push({"id": "Either Or" , "data": newData})
                        completeData.push({id: "Either Or", data: newData})
                    }
                    else{
                        // const nullYear = [{x:2019, y:200},{x: 2020, y: null}]
                        completeData.push({id: categories[i] , data: this.collectData(categories[i], filterData)})
                    }
                }

                const TestData = [
                    {
                        id: 'fake corp. A',
                        data: [
                            { x: 0, y: 7 },
                            { x: 1, y: 5 },
                            { x: 2, y: 11 },
                            { x: 3, y: 12 },
                            { x: 4, y: 13 },
                            { x: 5, y: null },
                            { x: 6, y: 18 },
                            { x: 7, y: 16 },
                            { x: 8, y: 8 },
                            { x: 9, y: 10 },
                            { x: 10, y: 9 },
                        ],
                    },
                    {
                        id: 'fake corp. B',
                        data: [
                            { x: 3, y: 14 },
                            { x: 4, y: 16 },
                            { x: 5, y: 19 },
                            { x: 6, y: 20 },
                            { x: 7, y: 18 },
                        ],
                    },
                ]


                const test1 = [
                    {
                        id: "Alcohol Abuse",
                        data: [
                            {x:2016, y :1},
                            {x:2017, y :2},
                            {x:2018, y :3},
                            {x:2019, y :null},
                            {x:2020, y :null}
                        ]
                    },
                    {
                        id: "Drug Abuse",
                        data: [
                            {x:2016, y :5},
                            {x:2017, y :6},
                            {x:2018, y :8},
                            {x:2019, y :null},
                            {x:2020, y :null}
                        ]
                    },
                    {
                        id: "Either Or",
                        data: [
                            {x:2016, y :null},
                            {x:2017, y :null},
                            {x:2018, y :null},
                            {x:2019, y :22},
                            {x:2020, y :25}
                        ]
                    }
                ]

                console.log("[==========SUBSTANCE ABUSE=========]", completeData)
                
                this.setState({
                    chartData: completeData
                })
            }) 
    }


    render(){
        if(!this.state.chartData){
            return <h1>Waiting for data</h1>
        }
        if(this.state.chartData){
            return(
                <NivoLineChart  subHeader={this.props.subHeader} header={this.props.header} data={this.state.chartData}/>
            )
        }
    }
}

export default SubstanceAbuseGraph;