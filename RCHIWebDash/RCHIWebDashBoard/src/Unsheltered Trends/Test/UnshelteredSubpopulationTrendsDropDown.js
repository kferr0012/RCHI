import React, { Component } from 'react'
import {Container,Grid, Header,Segment} from 'semantic-ui-react'

import YouthTrend from '../../components/UnshelteredTrendsPage/Trends/YouthTrend'
import SubstanceAbuseTrend from '../../components/UnshelteredTrendsPage/Trends/SubstanceAbuseTrend'
import DropdownTrends from '../../components/Utilities/tools/Dropdown'
import GeneralTrends from '../../components/UnshelteredTrendsPage/Trends/GeneralTrends'


class UnshelteredSubpopulationTrendsDropDown extends Component {
    constructor(){
        super();
        this.statP ={
            trendsSelected: []
        }
    }

    trendSelectHandler = (e, data) => {
        const color = [  
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 20, 255, 0.2)",
            "rgba(3, 203, 4, 0.2)",
            "rgba(241, 104, 4, 0.2)",
            "rgba(235, 181, 247, 100)",
            "rgba(184, 223, 14, 100)",
            "rgba(125, 125, 197, 100)",
            "rgba(15, 125, 197, 100)",


         ]
        
        //  let zip = data.value.map((x, i) => [x, backgroundcolor[i]]);
         let zip = data.value.map((x, i) => {
             return {
                 data: x,
                 backgroundColor: color[i]
             }
         });

        const trendsSelected = zip.map( x => {
            if( x.data === "Jail Release 12 Months") return <GeneralTrends label = 'with in last 12 months' query={x.data} title="Incarceration" backgroundColor={x.backgroundColor}/> 
            else if( x.data === "Youth (18-24)") return <YouthTrend/>
            else if ( x.data === "Substance Abuse") return <SubstanceAbuseTrend/>
            else return (<div>
                <GeneralTrends label = 'Interviewed' query={x.data} title={x.data}  backgroundColor={x.backgroundColor}/>
                    </div> )
        })


        this.setState({
            // trendsSelected: [...data.value]
            trendsSelected: [...trendsSelected]
        })
    }
    




render(){
    const trendsSelected =  this.state.trendsSelected.map((x,index) => {
        if(this.state.trendsSelected.length %3 === 0){
            return (<Grid.Column width={5}>
                {x}
              </Grid.Column>)
        }
        if(this.state.trendsSelected.length %2 === 0){
            return (<Grid.Column width={8}>
                {x}
              </Grid.Column>)
        }
        else if(this.state.trendsSelected.length === 1){
            return (<Grid.Column width={16}>
                {x}
              </Grid.Column>)
        }
        else{
            return (<Grid.Column width={8}>
                {x}
              </Grid.Column>)
        }

    })

    return(
        <Container>
            <Segment clearing>
                <Header as='h1'  textAlign='center'>
                    Unsheltered Subpopulation Trends 2015-2019
                    <Header sub> 2019 Riverside County Pit Count</Header>
                </Header>
            </Segment>
            {/* <SubstanceAbuseTrend/> */}
            <DropdownTrends changed={this.trendSelectHandler}/>
            <Grid divided='vertically'>
            {trendsSelected}
            </Grid>
        </Container>
    )
}



}

export default UnshelteredSubpopulationTrendsDropDown