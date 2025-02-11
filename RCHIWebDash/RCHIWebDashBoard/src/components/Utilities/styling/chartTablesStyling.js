import { colors } from "./colors";

export const ContainerWidth = "80%";

export const generalDashboardStyling = {
  "Sheltered Statistics": {
    expandIndex: "year",
    header: true,
    height: "120%"
  },
  Race: {
    indexBy: 'subpopulation',
    keys: ['total'],
    margin: { top: 5, right: 30, bottom: 50, left: 50 },
    divHeight: '15em',
    tickValues: 4,
    gridYValues: 4,
    maxValue: 2000
  },
  Age:{
    indexBy: 'subpopulation',
    keys: ['total'],
    margin: { top: 5, right: 30, bottom: 50, left: 50 },
    divHeight: '15em',
    tickValues: 4,
    gridYValues: 4,
    maxValue: 2000
  },
  Gender: { 
    margin:{ top: 20, bottom: 40, left: 40, right: 40 },
    divHeight: '16em',
    sortByValue: true,
    percentage: 0.25,
  },
  Ethnicity: { 
    margin:{ top: 20, bottom: 40, left: 40, right: 40 },
    divHeight: '16em',
    sortByValue: true,
    percentage: 0.25,
  },
  "Homeless Population Trend": {
    margin: { top: 20, right: 30, bottom: 100, left: 30 },
    max: 4000,
    tickValues: 4,
    gridYValues: 4,
    categories: ["sheltered"]
  },
  "Mental Health": {
    height: 50,
    header: 'mental health conditions',
    hideInterview: true,
  },
  "Substance Abuse": {
    height: 50,
    header: 'substance abuse',
    hideInterview: true,
  },
  "Physical Disability": {
    height: 50,
    header: 'physical disability',
    hideInterview: true,
  },
  "Household Composition": {
    header: false,
    tableHeight: '100%',
    divHeight: '12.0em',
    tableName: 'Household Composition',
    padding: 15,
  },
  "Prior Living Situations": {
    margin: {top: 0, bottom: 20, left: 60, right: 60 },
    enableRadialLabels: true,
    percentageFilter: 0.1,
    height: '12em',
    truncate: true,
    position: 'relative',
  },
  "Living Situations Table": {
    header: false,
    percentage_flag: true,
    height: '100%',
    padding: 10,
  }
}


export const newlyHomelessStyling = {
  Age: {
    tableName: "Age",
    tableHeight: "100%",
    divHeight: "20.8em",
    padding: {},
  },
  "Living Situation": {
    tableName: "Living Situation",
    tableHeight: "100%",
    divHeight: "20.8em",
    percentage_flag: "1",
    padding: {},
  },
  Ethnicity: {
    margin: { top: 30, bottom: 20 },
    divHeight: "15em",
    sortByValue: true,
    header: "Ethnicity",
  },
  Gender: {
    margin: { top: 30, bottom: 20 },
    divHeight: "15em",
    sortByValue: true,
    header: "Gender",
    percentage: 0.1,
  },
  Subpopulations: {
    tableName: "Subpopulation Statistics",
    tableHeight: "100%",
    divHeight: "37.8em",
  },
  Race: {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 50, right: 30, bottom: 50, left: 50 },
    divHeight: "25em",
    header: "Race",
  },
  Household: {
    tableName: "Household Composition",
    tableHeight: "100%",
    divHeight: "25em",
  },
};

export const unshelteredTrendsStyling = {
  Veteran: {
    header: "Veteran",
    // subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 200,
  },

  "Chronically Homeless": {
    header: "Chronically Homeless",
    // subHeader: "Interview Only",
    footnote: [
      "In 2019, the question changed.",
      "In 2020, newly homeless question was added.",
    ],
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 800,
  },

  "Families with Children": {
    header: "Families with Children ",
    // subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 10,
  },

  "Elderly (>62)": {
    header: "Elderly (≥62)",
    // subHeader: "Interview Only",
    footnote: [
      "≥62 due to HUD definition",
    ],
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 200,
  },

  "Youth (18-24)": {
    header: "Youth (18-24)",
    subHeader: "",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 300,
    // stacked: true,
    legend: true,
    // slice: true
  },

  "Victim of Domestic Violence": {
    header: "Victim of Domestic Violence",
    // subHeader: "Interview Only",
    footnote: ["In 2018, the question changed."],
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 4,
    gridYValues: 4,
    maxValue: 500,
  },

  "Jail Release 12 Months": {
    header: "Incarceration",
    subHeader: "within last 12 months",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  "AIDS or HIV": {
    header: "AIDS or HIV",
    // subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 50,
  },

  "Mental Health Conditions": {
    header: "Mental Health Conditions",
    // subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  PTSD: {
    header: "PTSD",
    // subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  "Brain Injury": {
    header: "Brain Injury",
    // subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  "Substance Abuse": {
    header: "Substance Abuse",
    // subHeader: "Interview Only",
    footnote: "Before 2019, questions are not comparable.",
    divHeight: "25em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 600,
    padding: 0.75,
  },
};

export const unshelteredSupervisoryDistrictStyling = {
  "Pit Count Trend": {
    header: "PIT Count Trend",
    subHeader: "",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[1],
    tickValues: 4,
    gridYValues: 4,
    maxValue: 800,
  },

  "Chronically Homeless": {
    header: "Chronically Homeless",
    subHeader: "Interview Only",
    dataType: "Interview",
    margin: { top: 30, bottom: 59 },
    divHeight: "12em",
    sortByValue: true,
  },
  Ethnicity: {
    header: "Ethnicity",
    margin: { top: 30, bottom: 20 },
    divHeight: "10em",
    sortByValue: true,
  },
  Subpopulations: {
    tableName: "Subpopulation Statistics",
    tableHeight: "100%",
    divHeight: "30em",
  },

  "PIT Count By City": {
    tableName: "PIT Count By City",
    subHeader: "",
    header: true,
    expandIndex: "year",
    tableHeight: "100%",
    divHeight: "15.0em",
  },

  "Volunteers By City": {
    tableName: "Volunteers by Deployment Site",
    subHeader: "",
    tableHeight: "100%",
    divHeight: "15.0em",
  },

  Race: {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 50, right: 30, bottom: 50, left: 50 },
    divHeight: "15em",
    header: "Race",
    maxValue: 300,
    tickValues: 5,
    gridYValues: 5,
  },

  Household: {
    tableName: "Household Composition",
    subHeader: "",
    tableHeight: "100%",
    divHeight: "15.0em",
  },
};

export const unshelteredCitiesStyling = {
  "Subpopulations": {
    tableName: "Subpopulation Statistics",
    tableHeight: "100%",
    divHeight: "30em",
  },
  
  "Living Situation": {
    tableName: "Living Situation",
    tableHeight: "100%",
    divHeight: "20.8em",
    percentage_flag: "1",
  },

  "Pie Chart": {
    // margin: { top: 20, bottom: 60 },
    height: "18em",
    sortByValue: true,
    position: "relative",
  },
 

  
  "Bar Graph": {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 30, right: 30, bottom: 50, left: 50 },
    divHeight: "20em",
    subHeader: "",
    // maxValue: 200,
    tickValues: 5,
    gridYValues: 5,
    labelSkipHeight: 0,
  },
  
  "Gender Table": {
    tableName: "Gender",
    tableHeight: "100%",
    divHeight: "100%",
  },
  "Race Table": {
    tableName: "Race",
    tableHeight: "100%",
    divHeight: "20em",
  },

  "Age Table": {
    tableName: "Age",
    tableHeight: "100%",
    divHeight: "20em",
  },

  "Race Chart": {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 30, right: 30, bottom: 50, left: 50 },
    divHeight: "30em",
    header: "Race",
    subHeader: "",
    tickValues: 5,
    gridYValues: 5,
  },

};

export const unshelteredVsShelteredStyling = {
  Sheltered: {
    tableName: "Sheltered Statistics",
    tableHeight: "100%",
    divHeight: "40em",
  },
  Unsheltered: {
    tableName: "Unsheltered Statistics",
    tableHeight: "100%",
    divHeight: "25em",
  },

  "Unsheltered Household": {
    tableName: "Unsheltered Statistics",
    tableHeight: "100%",
    divHeight: "15em",
  },
};

export const seniorsUnshelteredStyling = {
  "Living Situation": {
    tableName: "Living Situation",
    tableHeight: "100%",
    divHeight: "37.8em",
    percentage_flag: "1",
  },
  Ethnicity: {
    margin: { top: 30, bottom: 20 },
    divHeight: "15em",
    sortByValue: true,
    header: "Ethnicity",
  },
  Gender: {
    margin: { top: 30, bottom: 20 },
    divHeight: "15em",
    sortByValue: true,
    header: "Gender",
  },
  Subpopulations: {
    tableName: "Subpopulation Statistics",
    tableHeight: "100%",
    divHeight: "37.8em",
  },
  Race: {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 50, right: 30, bottom: 50, left: 50 },
    divHeight: "25em",
    header: "Race",
  },
  Household: {
    tableName: "Household Composition",
    tableHeight: "100%",
    divHeight: "25em",
  },
};
export const newYouthStyling = {
  "Living Situation": {
    tableName: "Living Situation",
    tableHeight: "100%",
    divHeight: "37.8em",
    percentage_flag: "1",
  },
  Ethnicity: {
    margin: { top: 30, bottom: 20 },
    divHeight: "15em",
    sortByValue: true,
    header: "Ethnicity",
  },
  Gender: {
    margin: { top: 30, bottom: 20 },
    divHeight: "15em",
    sortByValue: true,
    header: "Gender",
  },
  Subpopulations: {
    tableName: "Subpopulation Statistics",
    tableHeight: "100%",
    divHeight: "37.8em",
  },
  Race: {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 50, right: 30, bottom: 50, left: 50 },
    divHeight: "25em",
    header: "Race",
  },
  Household: {
    tableName: "Age Breakdown",
    tableHeight: "100%",
    divHeight: "25em",
  },
};
