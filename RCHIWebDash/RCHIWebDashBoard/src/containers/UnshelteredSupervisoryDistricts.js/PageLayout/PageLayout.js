import React from 'react'
import {Grid, GridColumn} from 'semantic-ui-react'

import HouseHoldComposition from '../../../components/UnshelteredSupervisoryDistricts/Data/HouseHoldComposition'
import VolunteersDeployment from '../../../components/UnshelteredSupervisoryDistricts/Data/VolunteerDeploymentSite'
import DistrictRaceBar from '../../../components/UnshelteredSupervisoryDistricts/Data/dynamic_race_bar_chart'
import PieDataNivo from '../../../components/UnshelteredSupervisoryDistricts/Data/PieDataNivo'
import PitCountTrend from '../../../components/UnshelteredSupervisoryDistricts/Data/PitCountTrend'
import PitCountByCity from '../../../components/UnshelteredSupervisoryDistricts/Data/PitCountByCity'

const PageLayout = ({currentDistrict}) => {
    return (
        <Grid >
        <Grid.Row >
            <Grid.Column width={8} >
                <PitCountTrend height={(window.innerHeight*.50)} clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
            </Grid.Column>
            <Grid.Column width={4}>
                            <PieDataNivo height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
                            <PieDataNivo  height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} query={currentDistrict + ",Ethinicity"} header={"Ethnicity"} subHeader={""}/>
            </Grid.Column>
            <Grid.Column width={4}>
            <h6>Population Counts</h6> 
            </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
            <Grid.Column >
                <PitCountByCity currentDistrict={currentDistrict} query={currentDistrict} header={"PIT Count By City"} subHeader={""}/>
            </Grid.Column>
            <Grid.Column >
                <VolunteersDeployment clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Volunteers By Deployment Site"} subHeader={""}/>
            </Grid.Column>
            <Grid.Column >
                <DistrictRaceBar clickedDistrict={currentDistrict} query={currentDistrict + ",Race"} header={"Race"} subHeader={""}/>
            </Grid.Column>
            <Grid.Column >
                <HouseHoldComposition clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Household Composition"} subHeader={"Interview Only"}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)}

export default PageLayout
