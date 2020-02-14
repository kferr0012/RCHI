export const host = "http://127.0.0.1:8000/"
export const root = "api/"
export const availableYears = {
    "2019" : true,
    "2020" : true,
}

export const availableFiles = {
    "CityTotalsByYear" : true ,
    "GeneralTableSubpopulations" : true ,
    "HouseholdsByCityYearInterview" : true ,
    "SubpopulationsByCity" : true ,
    "SubpopulationsByYear" : true ,
    "VolunteerDeployment" : true
}

//doesn't work
/*
export function getAvailableTables(){
    var fs = require('fs');
    var files = fs.readdirSync('../../../../../backend/fixtures/');

    console.log(files)

}
*/
