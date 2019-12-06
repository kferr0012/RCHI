import React from 'react'
import {Grid, GridColumn, MountNode} from 'semantic-ui-react'
import { Row, Col } from 'antd';
import HouseHoldComposition from '../Data/HouseHoldComposition'

import VolunteersDeployment from '../Data/VolunteerDeploymentSite'
import DistrictRaceBar from '../Data/dynamic_race_bar_chart'
import PieDataNivo from '../Data/PieDataNivo'
import PitCountTrend from '../Data/PitCountTrend'
import PitCountByCity from '../Data/PitCountByCity'



//const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;


const PageLayout = ({currentDistrict}) => {
    return(
    <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} className="my-row-1" type="flex" justify="space-around" align="middle">
                
                <Col className="gutter-row" span={10}>
                    <div className="gutter-box"> 
                        <PitCountTrend height={(window.innerHeight*.50)} clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
                    <div className="gutter-box">
                        <Row>
                            <PieDataNivo height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
                        </Row>
                        <Row>
                            <PieDataNivo  height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} query={currentDistrict + ",Ethinicity"} header={"Ethnicity"} subHeader={""}/>
                        </Row>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div className="gutter-box">
                        <h4>Population Counts</h4> 
                    </div>
                </Col>
        </Row>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="space-between" align="bottom">
                <Col className="gutter-row" span={4}>
                    <PitCountByCity currentDistrict={currentDistrict} query={currentDistrict} header={"PIT Count By City"} subHeader={""}/>
                </Col>
                <Col className="gutter-row" span={4}>
                    <VolunteersDeployment clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Volunteers By Deployment Site"} subHeader={""}/>
                </Col>
                <Col className="gutter-row" span={10}>
                    <DistrictRaceBar clickedDistrict={currentDistrict} query={currentDistrict + ",Race"} header={"Race"} subHeader={""}/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <HouseHoldComposition clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Household Composition"} subHeader={"Interview Only"}/>
                </Col>
        </Row> 
                {/* <Row >
                    <Col span={8} >
                        <PitCountTrend height={(window.innerHeight*.50)} clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
                    </Col>
                    <Col span={4}>
                                    <PieDataNivo height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
                                    <PieDataNivo  height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} query={currentDistrict + ",Ethinicity"} header={"Ethnicity"} subHeader={""}/>
                    </Col>
                    <Col span={4}>
                        <h6>Population Counts</h6> 
                        <h1>hello</h1>
                    </Col>
                </Row> */}
            {/* <div>
                <Row span={4}>
                    <Col >
                        <PitCountByCity currentDistrict={currentDistrict} query={currentDistrict} header={"PIT Count By City"} subHeader={""}/>
                    </Col>
                    <Col >
                        <VolunteersDeployment clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Volunteers By Deployment Site"} subHeader={""}/>
                    </Col>
                    <Col >
                        <DistrictRaceBar clickedDistrict={currentDistrict} query={currentDistrict + ",Race"} header={"Race"} subHeader={""}/>
                    </Col>
                    <Col >
                        <HouseHoldComposition clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Household Composition"} subHeader={"Interview Only"}/>
                    </Col>
                </Row>
            </div> */}
        </div>
)}

export default PageLayout
