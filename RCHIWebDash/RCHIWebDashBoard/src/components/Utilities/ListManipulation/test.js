
import React, { Component } from 'react';
import axios from 'axios';
import { combine } from "./combine.js";
import { get }  from "./filter.js";

export default class Test extends Component {
    constructor(props){
        super(props)
        this.state = {
            inData : []
        }
    }

    componentWillMount(){
        this.getData()
    }

    async getData(){
        const promise = await axios.get("http://localhost:8000/api/HouseholdsByCityYearInterview/");
        const inData = promise.status===200 ? promise.data: [];
        this.setState({
            inData: inData,
        });
    }

    render(){
        const inData = this.state.inData;
        if (inData.length > 0)
        { 
            console.log ("inData");
            console.log( inData.length ); // 32
            console.log( inData );
            // tests filter
            var d1 = get( inData, "district", 1 );
            var d2 = get( inData, "district", 2 );
            var d3 = get( inData, "district", 3 );
            var d4 = get( inData, "district", 4 );
            var d5 = get( inData, "district", 5 );

            // test combine works
            var cb = combine(d1, d2);
            cb = combine(cb, d3);
            cb = combine(cb, d4);
            cb = combine(cb, d5);

            console.log ("combined");
            console.log(cb.length); //32
            console.log( cb );
            // checks that repeated ids were not added
            console.log ("repeated combined");
            cb = combine(cb, d5);
            console.log(cb.length); //32
        }

        return <div></div>
    }
}
