import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'
import TrendNavBar from '../../components/Utilities/tools/NavigationBar'
import Header from '../../components/UnshelteredTrendsPage/Layout/Header'
import TrendPage1 from '../../components/UnshelteredTrendsPage/Layout/TrendsPages/LayoutPage1'
import TrendPage2 from '../../components/UnshelteredTrendsPage/Layout/TrendsPages/LayoutPage2'
import TrendPage3 from '../../components/UnshelteredTrendsPage/Layout/TrendsPages/LayoutPage3'

import GeneralTrendsNivo from '../../components/UnshelteredTrendsPage/Trends/GeneralTrendsNivo'
import YouthTrend from '../../components/UnshelteredTrendsPage/Trends/YouthTrend'
import SubstanceAbuseTrend from '../../components/UnshelteredTrendsPage/Trends/SubstanceAbuseTrend'

class UnshelteredSubpopulationTrends extends Component{
    constructor(){
        super();
        this.state = {
            currentPage : 1,
            trendsSelected: ['Veteran','Youth (18-24)','Chronically Homeless','Families with Children','Elderly (>62)'],
            pageDisplayed: <TrendPage1/>,
            totalPages:3
        }
    }

    NavOnChangeHandler = (e, data) => {
        const currentPage = data.activePage
        var newSelected = []


        if(currentPage === 1){
            newSelected = ['Veteran','Youth (18-24)','Chronically Homeless','Families with Children','Elderly (>62)']
        }
        else if(currentPage ===2){
            newSelected = ['Substance Abuse','Victim of Domestic Violence','Jail Release 12 Months']
        }
        else if (currentPage === 3){
            newSelected = ['AIDS or HIV', 'Mental Health Conditions','PTSD','Brain Injury']
        }
        this.setState({
            currentPage: currentPage,
            trendsSelected: newSelected
        })
    } 

    TrendSelectedHandler(){
        return this.state.trendsSelected.map((trend, index )=> {
            if(trend === "Jail Release 12 Months") return <GeneralTrendsNivo id={index} key={index} label = 'with in last 12 months' query={trend} title="Incarceration"/>
            else if(trend === "Youth (18-24)") return <YouthTrend  header={trend} subHeader={'Interviewed Only'} id={index} key={index} query={trend}/>
            else if(trend === "Substance Abuse") return <SubstanceAbuseTrend header={trend} subHeader={''} id={index} key={index} query={"Subpopulations"}/> 
            else return <GeneralTrendsNivo header={trend} subHeader={'Interviewed Only'} id={'Interviewed'} key={index} query={trend}/>
        })
    }

    PageHandler(){
        if(this.state.currentPage === 1) return <TrendPage1 trendsSelected={this.TrendSelectedHandler()}/>
        else if(this.state.currentPage === 2) return <TrendPage2 trendsSelected={this.TrendSelectedHandler()}/>
        else return <TrendPage3 trendsSelected={this.TrendSelectedHandler()}/>
    }


    render(){
        return(
            <Container>
                <TrendNavBar totalPages={this.state.totalPages} changed = {this.NavOnChangeHandler}/>
                <Header currentPage = {this.state.currentPage}/>
                {this.PageHandler()}
            </Container>
        )
    }
}

export default UnshelteredSubpopulationTrends;