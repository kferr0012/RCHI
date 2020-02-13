import React, { Component } from 'react'

import '../components/css/newlyHomelessGrid.css'

export default class NewlyHomelessGrid extends Component{
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div id="nh-container">
                <div className="row">
                    <div className="col-lg-5">
                        <p>r1c1</p>
                    </div>
                    <div className="col-lg-4" id="nh-2r">
                        <div id="nh-2r-r1">
                            <p>r1c2r1</p>
                        </div>
                        <div id="nh-2r-r2">
                            <p>r1c2r2</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <p>r1c3</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <p>r2c1</p>
                    </div>
                    <div className="col-lg-2">
                        <p>r2c2</p>
                    </div>
                    <div className="col-lg-5">
                        <p>r2c3</p>
                    </div>
                    <div className="col-lg-3">
                        <p>r2c4</p>
                    </div>
                </div>
            </div>
        )
    }
}