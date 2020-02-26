import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import TrendNavBar from '../components/Utilities/tools/NavigationBar'

import Header from './PageLayout/Utilities/Header'

import PageLayout from './PageLayout/PageLayout'

import {aggregateFetch, expandOnField } from './../components/Utilities/ListManipulation/aggregateFetch'
import { router } from '../components/Utilities/constants/routing'


class UnshelteredSupervisoryDistricts extends Component{
    constructor(){
        super();
        this.state = {
            currentPage : 1,
            pageDisplayed: null,
            totalPages:5,
            districtDisplay:null,
            urls : [router.host + '/' + router.root + '/' + router.formerYear + "/SubpopulationsByCity/",
                    router.host + '/' + router.root + '/' + router.activeYear + "/SubpopulationsByCity/"],
            rendered : false,

            
        }
    }  

    reformatData(Tables){
        //generate keys of district
        Tables[router.formerYear +"/SubpopulationsByCity"] = expandOnField(Tables[router.formerYear +"/SubpopulationsByCity"],"district")
        Tables[router.activeYear +"/SubpopulationsByCity"] = expandOnField(Tables[router.activeYear +"/SubpopulationsByCity"],"district")
        
        //generate keys by category

        for(const key in Tables[router.formerYear +"/SubpopulationsByCity"]){
            Tables[router.formerYear +"/SubpopulationsByCity"][key] = expandOnField(Tables[router.formerYear +"/SubpopulationsByCity"][key], "category")
        }

        for(const key in Tables[router.activeYear +"/SubpopulationsByCity"]){
            Tables[router.activeYear +"/SubpopulationsByCity"][key] = expandOnField(Tables[router.activeYear +"/SubpopulationsByCity"][key], "category")
        }

        return Tables

    }
    
    async componentDidMount(){
        console.log("SD componentDidMount")
        var Tables = await aggregateFetch(this.state.urls,false)
        
        this.setState({
            Tables: this.reformatData(Tables),
            rendered : true,
        })
    }
    NavOnChangeHandler = (e, data) => {
        const currentPage = data.activePage


        this.setState({
            currentPage: currentPage,
            districtDisplay: <PageLayout currentDistrict={this.state.currentPage} tables = {this.state.Tables}/>
        })
    } 

    render(){
        return(

             <div>
            
             {this.state.rendered ? 
                <Container style={{width:'80%'}}>           

                <TrendNavBar totalPages={this.state.totalPages} changed = {this.NavOnChangeHandler}/>
                <Header currentPage = {this.state.currentPage}/>
                <PageLayout currentDistrict={this.state.currentPage} tables = {this.state.Tables}/>    
                </Container>

             : 0
            }

            </div>
        )
    }
}

export default UnshelteredSupervisoryDistricts;