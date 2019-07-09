import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class SupervisorialDistrictsHeader extends Component{
    render(){
        return(
			<p id="router-links">
				<span><Link to='/SupervisorialDistricts/1'>1</Link> | </span>
				<span><Link to='/SupervisorialDistricts/2'>2</Link> | </span>
				<span><Link to='/SupervisorialDistricts/3'>3</Link> | </span>
				<span><Link to='/SupervisorialDistricts/4'>4</Link> | </span>
				<span><Link to='/SupervisorialDistricts/5'>5</Link> | </span>
			</p>
        );
    }
}