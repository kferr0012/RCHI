import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import HouseHoldComposition from "../Data/HouseHoldComposition";

import VolunteersDeployment from "../Data/VolunteerDeploymentSite";
import PieDataNivo from "../Data/PieDataNivo";
import PitCountTrend from "../Data/PitCountTrend";
import PitCountByCity from "../Data/PitCountByCity";

import { filterList } from "../../components/Utilities/ListManipulation/filter";
import { changeVals2020 } from '../../components/Utilities/ListManipulation/changeValue'
import { combineCountsByCategory } from "../../components/Utilities/ListManipulation/combine";
import "../../components/css/newlyHomelessGrid.css";
import "./PageLayout.css";

import BarChart from "../../components/reformatedCharts/BarChart";
import TableComponent4 from "../../components/charts/TableComponent4";

import { router } from "../../components/Utilities/constants/routing";

import { unshelteredSupervisoryDistrictStyling } from "../../components/chartTablesStyling/chartTablesStyling";

const filteredTableList = [
  "Families with Children",
  "Children Only",
  "Unknown Veteran",
  "Adults Only",
  "Total",
  "Veteran No",
  "Not Chronically Homeless",
  "No Substance Abuse",
  "Unknown Substance Abuse",
  "No PTSD",
  "Unknown PTSD",
  "No Mental Health Conditions",
  "Unknown Mental Health Conditions",
  "No Physical Disability",
  "Unknown Physical Disability",
  "No Developmental Disability",
  "Unknown Developmental Disability",
  "No Brain Injury",
  "Not Victim of Domestic Violence",
  "Unknown Victim of Domestic Violence",
  "No AIDS or HIV",
  "Unknown AIDS or HIV",
  "Jail Release 90 Days: Probation",
  "Jail Release 90 Days: Parole",
  "Jail Release 90 Days: Completed Sentence",
  "Jail Release 90 Days: (Unspecified)",
  "Jail Release 12 Months: Probation",
  "Jail Release 12 Months: Parole",
  "Jail Release 12 Months: Completed Sentence",
  "Jail Release 12 Months: (Unspecified)",
  "Unknown Brain Injury",
  "No Jail",
  "Unknown Jail"
];
const PageLayout = ({ currentDistrict, tables }) => {
  return (
    <Grid stackable>
      <Grid.Row verticalAlign="middle" stretched columns={3} divided>
        <Grid.Column>
          {/* <p className="component-header">PitCount Trend</p> */}
          <PitCountTrend
            // height={(window.innerHeight*.50)}
            clickedDistrict={currentDistrict}
            query={currentDistrict}
            {...unshelteredSupervisoryDistrictStyling["Pit Count Trend"]}
          />
        </Grid.Column>
        <Grid.Column>
          <PieDataNivo
            // height={(window.innerHeight*.23)}
      
            clickedDistrict={currentDistrict}
            currentDistrict={currentDistrict}
            query={currentDistrict + ",Chronically Homeless"}
            header={"Chronically Homeless"}
            {...unshelteredSupervisoryDistrictStyling["Chronically Homeless"]}
          />

          <br />
          
          <PieDataNivo
            clickedDistrict={currentDistrict}
            currentDistrict={currentDistrict}
            query={currentDistrict + ",Ethnicity"}
            {...unshelteredSupervisoryDistrictStyling["Ethnicity"]}
          />
        </Grid.Column>
        <Grid.Column>
          <TableComponent4
            data={combineCountsByCategory(
              changeVals2020(filterList(
                tables[router.activeYear + "/SubpopulationsByCity"][
                  currentDistrict
                ]["Age"]
                  .concat(
                    tables[router.activeYear + "/SubpopulationsByCity"][
                      currentDistrict
                    ]["Gender"]
                  )
                  .concat(
                    tables[router.activeYear + "/SubpopulationsByCity"][
                      currentDistrict
                    ]["Subpopulations"]
                  ),
                "subpopulation",
                filteredTableList
              ))
            )}
            {...unshelteredSupervisoryDistrictStyling["Subpopulations"]}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row verticalAlign="middle" stretched columns={3}>
        <Grid.Column width={0}>
          <PitCountByCity
            clickedDistrict={currentDistrict}
            currentDistrict={currentDistrict}
            query={currentDistrict}
            {...unshelteredSupervisoryDistrictStyling["PIT Count By City"]}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <VolunteersDeployment
            clickedDistrict={currentDistrict}
            currentDistrict={currentDistrict}
            query={currentDistrict}
            {...unshelteredSupervisoryDistrictStyling["Volunteers By City"]}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <HouseHoldComposition
            clickedDistrict={currentDistrict}
            currentDistrict={currentDistrict}
            query={currentDistrict}
            {...unshelteredSupervisoryDistrictStyling["Household"]}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{marginTop:"10px"}}>
        <Grid.Column width={13}>
          <BarChart
            data={filterList(
              combineCountsByCategory(
                tables[router.activeYear + "/SubpopulationsByCity"][
                  currentDistrict
                ]["Race"]
              ),
              "subpopulation",
              ["Total"]
            )}
            {...unshelteredSupervisoryDistrictStyling["Race"]}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PageLayout;
