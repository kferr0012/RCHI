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
            urls : ["http://127.0.0.1:8000/api/SubpopulationsByCity2019/"],
            rendered : false,

            
        }
    }
    
    async componentDidMount(){
        console.log("SD componentDidMount")
        var Tables = await aggregateFetch(this.state.urls,false)
        
        //generate keys of district
        Tables["SubpopulationsByCity2019"] = expandOnField(Tables["SubpopulationsByCity2019"],"district")

        //generate keys by category
        for(const key in Tables["SubpopulationsByCity2019"]){
            Tables["SubpopulationsByCity2019"][key] = expandOnField(Tables["SubpopulationsByCity2019"][key], "category")
        }

        console.log("Available Tables")
        console.log(Tables)

        this.setState({
            Tables: Tables,
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