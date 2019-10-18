import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'
import TrendNavBar from '../../components/Utilities/tools/NavigationBar'
import Header from '../../components/UnshelteredSupervisoryDistricts/Layout/Header'
import PageLayout from './PageLayout/PageLayout'
// import PageLayout from '../../components/UnshelteredSupervisoryDistricts/Layout/PageLayout'
import PieLayout from '../../components/UnshelteredSupervisoryDistricts/Data/PieDataNivo'
import PitCountTrend from '../../components/UnshelteredSupervisoryDistricts/Data/PitCountTrend'
import PitCountByCity from '../../components/UnshelteredSupervisoryDistricts/Data/PitCountByCity'

class UnshelteredSupervisoryDistricts extends Component{
    constructor(){
        super();
        this.state = {
            currentPage : 1,
            pageDisplayed: null,
            totalPages:5,
            districtDisplay:null
        }
    }

    NavOnChangeHandler = (e, data) => {
        const currentPage = data.activePage


        this.setState({
            currentPage: currentPage,
            districtDisplay: <PageLayout currentDistrict={this.state.currentPage}/>
        })
    } 

    render(){
        return(
            <Container style={{width:'80%'}}>
                <TrendNavBar totalPages={this.state.totalPages} changed = {this.NavOnChangeHandler}/>
                <Header currentPage = {this.state.currentPage}/>
                {/* {this.state.districtDisplay} */}
                <PageLayout currentDistrict={this.state.currentPage}/>
            </Container>
        )
    }
}

export default UnshelteredSupervisoryDistricts;