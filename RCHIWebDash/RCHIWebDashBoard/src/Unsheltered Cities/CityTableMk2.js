import React, {Component} from 'react';

import '../components/css/dash.css';


export default class CityTable extends Component{

    constructor(props){
        super(props)

        this.state = {
            urls : ["http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/",
                    "http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/"],
            Tables : [],
            rendered : true // false
        }
        
    }

    async componentDidMount(){
        console.log("didMount")
        var myTables = await aggregateFetch(this.state.urls)
        this.setState({
            Tables: myTables,
            rendered : true
        })

        console.log("available Tables")
        console.log(this.state.Tables)
    }

    renderDashboards(){

        return(
            <div className="container my-2" style={{backgroundColor: "#6f58c9"}}>
                <h2>City Level Information</h2>
                <p>dropdown</p>
                <div className="row dash-row">
                    <div className="col-md dash-col-com">
                        <div className="ct-grid-side">
                            <div className="ct-side-r1">
                                <p>Suppopulations Table</p>
                            </div>
                            <div className="ct-side-r2">
                                <p>Age Table</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 dash-col-com">
                        <div className="ct-grid-center">
                            <div className="ct-center-r1">
                                <div className="ct-center-r1c1">
                                    <p>Chronically Homeless</p>
                                </div>
                                <div className="ct-center-r1c2">
                                    <p>Total Unsheltered Count</p>
                                </div>
                                <div className="ct-center-r1c3">
                                    <p>Percent of District</p>
                                </div>
                            </div>
                            <div className="ct-center-r2">
                                <div className="ct-center-r2c1">
                                    <p>Hispanic Table</p>
                                </div>
                                <div className="ct-center-r2c2">
                                    <p>Hispanic Pie Chart</p>
                                </div>
                            </div>
                            <div className="ct-center-r3">
                                <p>Race Bar Chart</p>
                            </div>       
                        </div>
                    </div>
                    <div className="col-md dash-col-com">
                        <div className="ct-grid-side">
                            <div className="ct-side-r1-grid">
                                <div className="ct-side-r1r1">
                                    <p>Gender table</p>
                                    
                                </div>
                                <div className="ct-side-r1r2">
                                    <p>Gender chart</p>
                                    <BarGraph
                                        data = {Tables["SubpopulationsByCity2019"]["BEAUMONT"]["Gender"]}
                                        />
                                </div>
                            </div>
                            <div className="ct-side-r2">
                                <p>Race Table</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }

    render(){
        return(       
            <div>
                {this.state.rendered ? this.renderDashboards() : 0}
            </div>
        )
    }
}
