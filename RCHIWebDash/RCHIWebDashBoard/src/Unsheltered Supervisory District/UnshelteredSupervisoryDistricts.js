import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import TrendNavBar from '../components/Utilities/tools/NavigationBar'

import Header from './PageLayout/Utilities/Header'

import PageLayout from './PageLayout/PageLayout'

import {aggregateFetch, expandOnField } from './../components/Utilities/ListManipulation/aggregateFetch'
import { router } from '../components/Utilities/constants/routing'
import { ContainerWidth } from '../components/chartTablesStyling/chartTablesStyling'


class UnshelteredSupervisoryDistricts extends Component{
    constructor(){
        super();
        this.state = {
            currentPage : 1,
            pageDisplayed: null,
            totalPages:5,
            districtDisplay:null,
            urls : [router.host + '/' + router.root + '/' + router.formerYear + "/SubpopulationsByCity/",
                    router.host + '/' + router.root + '/' + router.activeYear + "/SubpopulationsByCity/",
                    router.host + '/' + router.root + '/' + router.activeYear + "/CityTotalByYear/"],
            rendered : false,

            
        }
    }  

    reformatData(Tables){

        //generate keys of district
        Tables[router.formerYear +"/SubpopulationsByCity"] = expandOnField(Tables[router.formerYear +"/SubpopulationsByCity"],"district")
        Tables[router.activeYear +"/SubpopulationsByCity"] = expandOnField(Tables[router.activeYear +"/SubpopulationsByCity"],"district")
        
        //generate keys by category
        // console.log("GENERATE KEYS by category")
        // console.log("TABLES:")
        // console.log(Tables)
        // console.log(router.formerYear + " data"     )
        for(const key in Tables[router.formerYear + "/SubpopulationsByCity"]){
            // console.log(key + ": ")
            // console.log(Tables[router.formerYear + "/SubpopulationsByCity"][key])
            Tables[router.formerYear + "/SubpopulationsByCity"][key] = expandOnField(Tables[router.formerYear + "/SubpopulationsByCity"][key], "category")
        }
        // console.log(router.activeYear + " data: ")
        // console.log(Tables[router.activeYear + "/SubpopulationsByCity"])

        for(const key in Tables[router.activeYear +"/SubpopulationsByCity"]){
            // console.log(key + ": ")
            // console.log("tabl: e")
            // console.log(Tables[router.activeYear + "/SubpopulationsByCity"])
            // console.log("table[key]")
            // console.log(Tables[router.activeYear + "/SubpopulationsByCity"][key])
            Tables[router.activeYear + "/SubpopulationsByCity"][key] = expandOnField(Tables[router.activeYear + "/SubpopulationsByCity"][key], "category")
        }

        return Tables

    }
    
    async componentDidMount(){
   
        var Tables = await aggregateFetch(this.state.urls,false)
        
        this.setState({
            Tables: this.reformatData(Tables),
            rendered : true,
        })
    }
    NavOnChangeHandler = (e, data) => {

        const currentPage = data.activePage


        setTimeout(() => {
            this.setState({
                currentPage: currentPage,
                districtDisplay: <PageLayout currentDistrict={this.state.currentPage} tables = {this.state.Tables}/>
            })
            this.setState({
                currentPage: currentPage,
                districtDisplay: <PageLayout currentDistrict={this.state.currentPage} tables = {this.state.Tables}/>
            })
        }, 200)



        // setTimeout(() => {
        //     this.setState({
        //       cityChoice: value.value
        //     });
        //     this.setState({
        //       cityChoice: value.value
        //     });
        //     this.setState({
        //       cityChoice: value.value
        //     });
        //     this.setState({
        //       cityChoice: value.value
        //     });
        //   }, 200);
    } 

    render(){

        return(

             <div>
            
             {this.state.rendered ? 
                <Container style={{width:ContainerWidth}}>           
                <TrendNavBar totalPages={this.state.totalPages} changed = {this.NavOnChangeHandler}/>
                <Header currentPage = {this.state.currentPage}/>
                <PageLayout currentDistrict={this.state.currentPage} tables = {this.state.Tables}/>    
                </Container>

                : (
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )
            }

            </div>
        )
    }
}

export default UnshelteredSupervisoryDistricts;