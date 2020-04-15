import { colors } from "../Utilities/colors";

export const ContainerWidth = "80%";

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
    subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 200,
  },

  "Chronically Homeless": {
    header: "Chronically Homeless",
    subHeader: "Interview Only",
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
    subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 10,
  },

  "Elderly (>62)": {
    header: "Elderly (≥62)",
    subHeader: "Interview Only",
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
    maxValue: 600,
    stacked: true,
    legend: true,
  },

  "Victim of Domestic Violence": {
    header: "Victim of Domestic Violence",
    subHeader: "Interview Only",
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
    subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 50,
  },

  "Mental Health Conditions": {
    header: "Mental Health Conditions",
    subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  PTSD: {
    header: "PTSD",
    subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  "Brain Injury": {
    header: "Brain Injury",
    subHeader: "Interview Only",
    divHeight: "30em",
    margin: { top: 20, right: 20, bottom: 80, left: 30 },
    colors: colors[7],
    tickValues: 5,
    gridYValues: 5,
    maxValue: 500,
  },

  "Substance Abuse": {
    header: "Substance Abuse",
    subHeader: "Interview Only",
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
  Subpopulations: {
    tableName: "Subpopulation Statistics (Interview Only)",
    tableHeight: "100%",
    divHeight: "30em",
  },

  Ethnicity: {
    header: "Ethnicity",
    margin: { top: 30, bottom: 20 },
    divHeight: "12em",
    sortByValue: true,
  },

  "Gender Table": {
    tableName: "Gender",
    tableHeight: "100%",
    divHeight: "100%",
  },

  "Gender Chart": {
    indexBy: "subpopulation",
    keys: ["total"],
    margin: { top: 30, right: 30, bottom: 50, left: 50 },
    divHeight: "20em",
    header: "Gender",
    subHeader: "",
    // maxValue: 200,
    tickValues: 5,
    gridYValues: 5,
    labelSkipHeight: 0,
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

  "Living Situation": {
    tableName: "Living Situation",
    tableHeight: "100%",
    divHeight: "20.8em",
    percentage_flag: "1",
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
