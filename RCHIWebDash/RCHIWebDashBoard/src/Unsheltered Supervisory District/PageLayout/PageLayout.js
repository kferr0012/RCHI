import React from 'react'
import {Grid, GridColumn, MountNode} from 'semantic-ui-react'
import { Row, Col } from 'antd';
import HouseHoldComposition from '../Data/HouseHoldComposition'

import VolunteersDeployment from '../Data/VolunteerDeploymentSite'
import DistrictRaceBar from '../Data/dynamic_race_bar_chart'
import PieDataNivo from '../Data/PieDataNivo'
import PitCountTrend from '../Data/PitCountTrend'
import PitCountByCity from '../Data/PitCountByCity'

import TableComponent4 from '../../components/charts/TableComponent4'
import {filterList} from '../../components/Utilities/ListManipulation/filter'
import {combineCountsByCategory} from '../../components/Utilities/ListManipulation/combine'
import '../../components/css/newlyHomelessGrid.css';

//const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const filteredTableList = ["Total","Veteran No", "Not Chronically Homeless", "No Substance Abuse", "Unknown Substance Abuse", "No PTSD", "Unknown PTSD", "No Mental Health Conditions", "Unknown Mental Health Conditions", "No Physical Disability", "Unknown Physical Disability", "No Developmental Disability","Unknown Developmental Disability", "No Brain Injury", "Not Victim of Domestic Violence", "Unknown Victim of Domestic Violence", "No AIDS or HIV", "Unknown AIDS or HIV", "Jail Release 90 Days: Probation", "Jail Release 90 Days: Parole", "Jail Release 90 Days: Completed Sentence", "Jail Release 90 Days: (Unspecified)", "Jail Release 12 Months: Probation", "Jail Release 12 Months: Parole", "Jail Release 12 Months: Completed Sentence", "Jail Release 12 Months: (Unspecified)", "Unknown Brain Injury", "No Jail", "Unknown Jail"]
const PageLayout = ({currentDistrict, tables}) => {
    console.log("PageLayout tables:")
    console.log(tables)
    return(
        <div id="nh-container">
            <div className="row">
                <div className="col-lg-5">
                    {/* <p>r1c1</p> */}
                    <PitCountTrend height={(window.innerHeight*.50)} clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
                </div>
                <div className="col-lg-4" id="nh-2r">
                    <div id="nh-2r-r1">
                        {/* <p>r1c2r1</p> */}
                        <PieDataNivo height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
                    </div>
                    <div id="nh-2r-r2">
                        {/* <p>r1c2r2</p> */}
                        <PieDataNivo  height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} query={currentDistrict + ",Ethnicity"} header={"Ethnicity"} subHeader={""}/>
                    </div>
                </div>
                <div className="col-lg-3">
                    {/* <p>r1c3</p> */}
                    <h4>Population Counts</h4>
                    <TableComponent4
                        data = {combineCountsByCategory(filterList(tables["2020/SubpopulationsByCity"][currentDistrict]["Age"].concat(tables["2020/SubpopulationsByCity"][currentDistrict]["Gender"]).concat(tables["2020/SubpopulationsByCity"][currentDistrict]["Subpopulations"]), "subpopulation", filteredTableList))}
                        height = {"100%"}
                    />
                    
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2">
                    {/* <p>r2c1</p> */}
                    <PitCountByCity currentDistrict={currentDistrict} query={currentDistrict} header={"PIT Count By City"} subHeader={""}/>
                </div>
                <div className="col-lg-2">
                    {/* <p>r2c2</p> */}
                    <VolunteersDeployment clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Volunteers By Deployment Site"} subHeader={""}/>
                </div>
                <div className="col-lg-5">
                    {/* <p>r2c3</p> */}
                    <DistrictRaceBar clickedDistrict={currentDistrict} query={currentDistrict + ",Race"} header={"Race"} subHeader={""}/>
                </div>
                <div className="col-lg-3">
                    {/* <p>r2c4</p> */}
                    <HouseHoldComposition clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Household Composition"} subHeader={"Interview Only"}/>
                </div>
            </div>
        </div>
        // <div id="nw-container" className="container">
        //     <div className="row" id="nw-r1">
        //         <div id="nw-r1c1">
        //             {/* <p>r1c1</p> */}
        //             <PitCountTrend height={(window.innerHeight*.50)} clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
        //         </div>
        //         <div id="nw-r1c2">
        //             <div id="nw-r1c2r1">
        //                 {/* <p>r1c2r1</p> */}
        //                 <PieDataNivo height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
        //             </div>
        //             <div id="nw-r1c2r2">
        //                 {/* <p>r1c2r2</p> */}
        //                 <PieDataNivo  height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} query={currentDistrict + ",Ethinicity"} header={"Ethnicity"} subHeader={""}/>
        //             </div>
        //         </div>
        //         <div id="nw-r1c3">
        //             {/* <p>r1c3</p> */}
        //             <h4>Population Counts</h4>
        //         </div>
        //     </div>
        //     <div className="row" id="nw-r2">
        //         <div id="nw-r2c1">
        //             {/* <p>r2c1</p> */}
        //             <PitCountByCity currentDistrict={currentDistrict} query={currentDistrict} header={"PIT Count By City"} subHeader={""}/>
        //         </div>
        //         <div id="nw-r2c2">
        //             {/* <p>r2c2</p> */}
        //             <VolunteersDeployment clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Volunteers By Deployment Site"} subHeader={""}/>
        //         </div>
        //         <div id="nw-r2c3">
        //             {/* <p>r2c3</p> */}
        //             <DistrictRaceBar clickedDistrict={currentDistrict} query={currentDistrict + ",Race"} header={"Race"} subHeader={""}/>
        //         </div>
        //         <div id="nw-r2c4">
        //             {/* <p>r2c4</p> */}
        //             <HouseHoldComposition clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Household Composition"} subHeader={"Interview Only"}/>
        //         </div>
        //     </div>
        // </div>
    // <div>
    //     <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} className="my-row-1" type="flex" justify="space-around" align="middle">
                
    //             <Col className="gutter-row" span={10}>
    //                 <div className="gutter-box"> 
    //                     <PitCountTrend height={(window.innerHeight*.50)} clickedDistrict={currentDistrict} query={currentDistrict} header={"Pit Count Trend"} subHeader={""} />
    //                 </div>
    //             </Col>
    //             <Col className="gutter-row" span={8}>
    //                 <div className="gutter-box">
    //                     <Row>
    //                         <PieDataNivo height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict + ",Chronically Homeless"} header={"Chronically Homeless"} subHeader={""}/>
    //                     </Row>
    //                     <Row>
    //                         <PieDataNivo  height={(window.innerHeight*.23)} clickedDistrict={currentDistrict} query={currentDistrict + ",Ethinicity"} header={"Ethnicity"} subHeader={""}/>
    //                     </Row>
    //                 </div>
    //             </Col>
    //             <Col className="gutter-row" span={6}>
    //                 <div className="gutter-box">
    //                     <h4>Population Counts</h4> 
    //                 </div>
    //             </Col>
    //     </Row>
    //     <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="space-between" align="top">
    //             <Col className="gutter-row" span={4}>
    //                 <PitCountByCity currentDistrict={currentDistrict} query={currentDistrict} header={"PIT Count By City"} subHeader={""}/>
    //             </Col>
    //             <Col className="gutter-row" span={4}>
    //                 <VolunteersDeployment clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Volunteers By Deployment Site"} subHeader={""}/>
    //             </Col>
    //             <Col className="gutter-row" span={10}>
    //                 <DistrictRaceBar clickedDistrict={currentDistrict} query={currentDistrict + ",Race"} header={"Race"} subHeader={""}/>
    //             </Col>
    //             <Col className="gutter-row" span={6}>
    //                 <HouseHoldComposition clickedDistrict={currentDistrict} currentDistrict={currentDistrict}  query={currentDistrict} header={"Household Composition"} subHeader={"Interview Only"}/>
    //             </Col>
    //     </Row> 
            
    //     </div>
)}

export default PageLayout
