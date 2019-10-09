import React from 'react'
import {Grid, GridColumn} from 'semantic-ui-react'

import HouseHoldComposition from '../Data/HouseHoldComposition'
import VolunteersDeployment from '../Data/VolunteerDeploymentSite'
import DistrictRaceBar from '../Data/dynamic_race_bar_chart'
import PieDataNivo from '../Data/PieDataNivo'
import PitCountTrend from '../Data/PitCountTrend'
import PitCountByCity from '../Data/PitCountByCity'
import NivoBar from '../Data/BarDataNivo'

const PageLayout = ({currentDistrict}) => {
    return (
    <Grid  celled>
        <Grid.Row  columns={3}>
            <Grid.Column>
                <PitCountTrend clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
            </Grid.Column>
            <Grid.Column>
                <Grid.Row>
                        <GridColumn>
                            <PieDataNivo clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row>
                        <GridColumn>
                        <PieDataNivo clickedDistrict={currentDistrict} query={currentDistrict + ",Ethinicity"} header={"Ethnicity"} subHeader={""}/>
                        </GridColumn>
                    </Grid.Row>
            </Grid.Column>
            <Grid.Column>
                <NivoBar/>
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