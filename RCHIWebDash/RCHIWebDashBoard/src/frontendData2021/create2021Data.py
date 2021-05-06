import pandas as pd
import numpy as np
import json
import sys

df = pd.read_csv('./HUD PIT DATA 2021.csv',encoding='cp1252')
print("[CREATING 2021 SHELTERED COUNTS]\n")
FILE_NAME = './HUD2021COUNTS.json'
print(f"[PUTTING COUNTS TO FILE '{FILE_NAME}']\n")
YEAR = 2021

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)

# {
#     "id": "78",
#     "year": 2020,
#     "category": "Total",
#     "subpopulation": "Individuals",
#     "interview": 1346,
#     "observation": 809,
#     "total": 2155,
#     "_type": "Unsheltered"
# }
def getTotalData(in_df):
    return {"category": "Total", "subpopulation": "Individuals","total": in_df.shape[0]}

def getCOVIDProgramValues(in_df):
    # returns program names and their respective counts
    programs = in_df['ProgramName'].value_counts()
    return programs 

def getTotalCOVID(df):
    total = []
    covidProgs = getCOVIDProgramValues(df).to_dict()
    for prog in covidProgs:
        total.append({"category": "COVID Programs", "subpopulation": prog, "total": covidProgs[prog]})
    return total

def getTotalAIDSHIV(in_df):
    total = in_df.loc[lambda df: (df['HIVAids'] == 'Yes'), :].shape[0] 
    return { "category": "Subpopulations", "subpopulation": 'AIDS or HIV',"total": total}

def getTotalMentallyIll(in_df):
    total = in_df.loc[lambda df: (df['MentallyIll'] == 'Yes'), :].shape[0] 
    return {"category": "Subpopulations","subpopulation": 'Mentally Ill', "total": total}

def getTotalRace(in_df):
    races = []
    reportedRaces = in_df['Race'].unique()
    for i, race in enumerate(reportedRaces):
        totalRace = in_df.loc[lambda df: (df['Race'] == race), :].shape[0]
        races.append({"category": "Race", "subpopulation": race, "total": totalRace}) 
    return races


def getTotalGender(in_df):
    genders = []
    reportedGenders = in_df['Gender'].unique()
    for i,gender in enumerate(reportedGenders):
        totalGender = in_df.loc[lambda df: (df['Gender'] == gender),:].shape[0]
        genders.append({"category": "Gender", "subpopulation": gender, "total": totalGender})
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
        ageBreakdown.append({"category": "Age", "subpopulation": ageGroup, "total": totalAge})

    return ageBreakdown

def getTotalChronicallyHomeless(in_df):
    total = in_df.loc[lambda df: (df['Chronic'] == 'Yes'),:].shape[0]
    return {"category": "Subpopulations","subpopulation": "Chronically Homeless", "total": total}

def getTotalSubstanceAbuse(in_df):
    total = in_df.loc[lambda df: (df['SubstanceAbuse'] == 'Yes'),:].shape[0]
    return {"category": "Subpopulations","subpopulation": "Substance Abuse", "total": total}

def getTotalHousehold(in_df):
    totalHouseholds = []
    uniqueHousehold = in_df['HouseholdType'].unique()
    for i,household in enumerate(uniqueHousehold):
        total = in_df.loc[lambda df: (df['HouseholdType'] == household), :].shape[0]
        totalHouseholds.append({'category': "Households", "subpopulation": household, "total": total})
    return totalHouseholds


def getYouthHouseholds(in_df):
    total = in_df.loc[lambda df: (df['YouthHousehold'] == 'Yes'), :].shape[0]
    return {"category": "Households", "subpopulation": 'Youth Households', "total": total}


def getTotalVeterans(in_df):
    total = in_df.loc[lambda df: (df['VeteranStatus'] == 'Yes'), :].shape[0]
    return {"category": "Subpopulations","subpopulation": 'Veteran',"total": total}

def getTotalEthnicity(in_df):
    totalEthnicity = []
    uniqueEthnicity = in_df['Ethnicity'].unique()
    for i,ethnicity in enumerate(uniqueEthnicity):
        total = in_df.loc[lambda df: (df['Ethnicity'] == ethnicity), :].shape[0]
        totalEthnicity.append({'category': 'Ethnicity', "subpopulation": ethnicity, "total": total})
    return totalEthnicity

def addMetaData(data):
    for i in range(len(data)):
        data[i]['id'] = i
        data[i]['_type'] = 'Sheltered'
        data[i]['year'] = YEAR 

def combineData(df):
    data = []
    # different subpopulations
    data += getTotalRace(df)
    data += getTotalGender(df)
    data += getTotalAgeGroups(df)
    data += getTotalEthnicity(df)
    data += getTotalHousehold(df)
    data += getTotalCOVID(df)
    # total that say 'Yes'
    data.append(getTotalData(df))
    data.append(getTotalAIDSHIV(df))
    data.append(getTotalMentallyIll(df))
    data.append(getTotalChronicallyHomeless(df))
    data.append(getTotalSubstanceAbuse(df))
    data.append(getTotalVeterans(df))
    data.append(getYouthHouseholds(df))

    addMetaData(data) # add id, year, sheltered info

    return data


data = combineData(df)

out = open(FILE_NAME,'w')

out.write (json.dumps(data, cls=NpEncoder, indent=4))
out.close()

print("[FINISHED WRITING DATA INTO JSON]")



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


