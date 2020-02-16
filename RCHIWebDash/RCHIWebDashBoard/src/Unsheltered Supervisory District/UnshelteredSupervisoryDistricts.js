import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import TrendNavBar from '../components/Utilities/tools/NavigationBar'

import Header from './PageLayout/Utilities/Header'

import PageLayout from './PageLayout/PageLayout'

import {aggregateFetch, expandOnField } from './../components/Utilities/ListManipulation/aggregateFetch'


class UnshelteredSupervisoryDistricts extends Component{
    constructor(){
        super();
        this.state = {
            currentPage : 1,
            pageDisplayed: null,
            totalPages:5,
            districtDisplay:null,
            urls : ["http://127.0.0.1:8000/api/SubpopulationsByCity/",
                    "http://127.0.0.1:8000/api/2020/SubpopulationsByCity/"],
            rendered : false,

            
        }
    }  

    reformatData(Tables){
        //generate keys of district
        Tables["SubpopulationsByCity"] = expandOnField(Tables["SubpopulationsByCity"],"district")
        Tables["2020/SubpopulationsByCity"] = expandOnField(Tables["2020/SubpopulationsByCity"],"district")
        //generate keys by category

        for(const key in Tables["SubpopulationsByCity"]){
            Tables["SubpopulationsByCity"][key] = expandOnField(Tables["SubpopulationsByCity"][key], "category")
        }

        for(const key in Tables["2020/SubpopulationsByCity"]){
            Tables["2020/SubpopulationsByCity"][key] = expandOnField(Tables["2020/SubpopulationsByCity"][key], "category")
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