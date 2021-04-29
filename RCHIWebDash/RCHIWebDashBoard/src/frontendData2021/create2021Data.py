import pandas as pd
import numpy as np
import json
import sys

df = pd.read_csv('./HUD PIT DATA 2021.csv',encoding='cp1252')
print("CREATING COUNTS")

YEAR = 2021

# Still need to combine the data and put it in the format we usually use

def getTotalData(df):
    return df.shape[0]

def convertDfToJson(df):
    return df.to_json()

def getCOVIDProgramValues():
    # returns program names and their respective counts
    programs = df['ProgramName'].value_counts()
    return programs 

def getTotalAIDSHIV(in_df):
    total = in_df.loc[lambda df: (df['HIVAids'] == 'Yes'), :].shape[0] 
    return {"year": YEAR ,"category": "Subpopulations", "total": total, "subpopulation": 'AIDS or HIV', 'sheltered': True}

def getTotalMentallyIll(in_df):
    total = in_df.loc[lambda df: (df['MentallyIll'] == 'Yes'), :].shape[0] 
    return {"year": YEAR ,"category": "Subpopulations", "total": total, "subpopulation": 'Mentally Ill', 'sheltered': True}

def getTotalRace(in_df):
    races = []
    reportedRaces = in_df['Race'].unique()
    for i, race in enumerate(reportedRaces):
        totalRace = in_df.loc[lambda df: (df['Race'] == race), :].shape[0]
        races.append({"category": "Race", "subpopulation": race, "total": totalRace, "year": YEAR}) 
    return races


def getTotalGender(in_df):
    genders = []
    reportedGenders = in_df['Gender'].unique()
    for i,gender in enumerate(reportedGenders):
        totalGender = in_df.loc[lambda df: (df['Gender'] == gender),:].shape[0]
        genders.append({"category": "Gender", "subpopulation": gender, "total": totalGender, "year": YEAR})
    return genders
    
def getTotalAgeGroups(in_df):
    # children, youth, adults, seniors
    ageBreakdown = []
    ageGroups = {
        'Children (<18)': {'min': 0, 'max': 17},
        'Youth (18-24)': {'min': 18, 'max': 24},
        'Adults (>24)': {'min': 25, 'max': 59},
        'Senior (60+)': {'min': 60, 'max': float('inf')},
    }
    for ageGroup in ageGroups:
        totalAge =  in_df.loc[lambda df: ((ageGroups[ageGroup]['min'] <= df['Age']) & (df['Age'] <= ageGroups[ageGroup]['max'])),:].shape[0]
        ageBreakdown.append({"category": "Age", "subpopulation": ageGroup, "total": totalAge, "year": YEAR})

    return ageBreakdown

def getTotalChronicallyHomeless(in_df):
    total = in_df.loc[lambda df: (df['Chronic'] == 'Yes'),:].shape[0]
    return {"subpopulation": "Chronically Homeless", "total": total, "year": YEAR}

def getTotalSubstanceAbuse(in_df):
    total = in_df.loc[lambda df: (df['SubstanceAbuse'] == 'Yes'),:].shape[0]
    return {"subpopulation": "Substance Abuse", "total": total, "year": YEAR}

def getTotalHousehold(in_df):
    totalHouseholds = []
    uniqueHousehold = in_df['HouseholdType'].unique()
    for i,household in enumerate(uniqueHousehold):
        total = in_df.loc[lambda df: (df['HouseholdType'] == household), :].shape[0]
        totalHouseholds.append({"subpopulation": 'Household','category': household, "total": total, "year": YEAR})
    return totalHouseholds

def getTotalVeterans(in_df):
    total = in_df.loc[lambda df: (df['VeteranStatus'] == 'Yes'), :].shape[0]
    return {"subpopulation": 'Veteran',"total": total, "year": YEAR}

def getYouthHouseholds(in_df):
    total = in_df.loc[lambda df: (df['YouthHousehold'] == 'Yes'), :].shape[0]
    return {"subpopulation": 'Youth Households',"total": total, "year": YEAR}

def getTotalEthnicity(in_df):
    totalEthnicity = []
    uniqueEthnicity = in_df['Ethnicity'].unique()
    for i,ethnicity in enumerate(uniqueEthnicity):
        total = in_df.loc[lambda df: (df['Ethnicity'] == ethnicity), :].shape[0]
        totalEthnicity.append({"subpopulation": ethnicity,'category': 'Ethnicity', "total": total, "year": YEAR})
    return totalEthnicity
   
# {
#     "id": "2",
#     "category": "Age",
#     "subpopulation": "Adults (>24)",
#     "total": 513,
#     "interview": 513,
#     "observation": 0,
#     "_type": "Sheltered",
#     "year": 2020
# }

# {
#     "id": "13",
#     "category": "Race",
#     "subpopulation": "Asian",
#     "total": 7,
#     "interview": 7,
#     "observation": 0,
#     "_type": "Sheltered",
#     "year": 2020
# }

# print("AIDS HIV: ",getTotalAIDSHIV(df))
# print("COVID PROGRAMS: \n", getCOVIDProgramValues())
# print("Total Data", getTotalData(df))
# print("Total Race: \n", getTotalRace(df))
# print("Total Genders: \n", getTotalGender(df))
# print("Total Age Groups: \n", getTotalAgeGroups(df))
# print("Total Chronically Homeless: \n", getTotalChronicallyHomeless(df))
# print("Total Substance Abuse: \n", getTotalSubstanceAbuse(df))
# print("Total Household: \n", getTotalHousehold(df))
# print("Total Ethnicity: \n", getTotalEthnicity(df))


