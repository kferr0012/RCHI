import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'


import TrendNavBar from '../components/Utilities/tools/NavigationBar'
import Header from './PageLayout/Utilites/Header'

import TrendPage1 from './PageLayout/LayoutPage1' 
import TrendPage2 from './PageLayout/LayoutPage2' 
import TrendPage3 from './PageLayout/LayoutPage3' 

import { unshelteredTrendsStyling, ContainerWidth } from '../components/chartTablesStyling/chartTablesStyling'



import GeneralTrendsNivo from './Data/GeneralTrendsNivo'
import YouthTrend from './Data/YouthTrend'
import SubstanceAbuseTrend from './Data/SubstanceAbuseTrend'

class UnshelteredSubpopulationTrends extends Component{
    constructor(){
        super();
        this.state = {
            currentPage : 1,
            trendsSelected: ['Veteran','Youth (18-24)','Chronically Homeless','Families with Children','Elderly (>62)'],
            pageDisplayed: <TrendPage1/>,
            totalPages:3,
            // maxValue = {Veteran: }
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
            if(trend === "Youth (18-24)"){ return <YouthTrend  
                id={index} 
                key={index} 
                query={trend}
                {...unshelteredTrendsStyling[trend]} 
                />
             
            }
            else if(trend === "Substance Abuse") return <div>
               
                    <SubstanceAbuseTrend 
                    query={"Substance Abuse"}
                    indexBy = {"year"}
                    keys={["total"]}
                    // footnote = {"Before 2018, questions are not comparable."}
                    {...unshelteredTrendsStyling[trend]} 
                    /> 
                </div>
            else return <GeneralTrendsNivo 
                lineID={trend} 
                id={'Interviewed'} 
                key={index} 
                query={trend}
                {...unshelteredTrendsStyling[trend]} 
                />
        })
    }

    PageHandler(){
        if(this.state.currentPage === 1) return <TrendPage1 trendsSelected={this.TrendSelectedHandler()}/>
        else if(this.state.currentPage === 2) return <TrendPage2 trendsSelected={this.TrendSelectedHandler()}/>
        else return <TrendPage3 trendsSelected={this.TrendSelectedHandler()}/>
    }


    render(){
        return(
            <Container style={{width:ContainerWidth}}>
                <TrendNavBar totalPages={this.state.totalPages} changed = {this.NavOnChangeHandler}/>
                <Header currentPage = {this.state.currentPage}/>
                {this.PageHandler()}
            </Container>
        )
    }
}

export default UnshelteredSubpopulationTrends;