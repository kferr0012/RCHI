import pandas as pd
import numpy as np
import json


# df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv')
df = df.loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

#! SCRIPT CHECKED 02/26/2020 12:02 JSON FINISHED

jsonFile = []

# read file
try:
    with open('./JSON/2019/SubpopulationsByYear.json', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []


year = input("Input Year: ")

model = "backend.SubpopulationsByYear" + year

newData = []
count = len(jsonData)
print("LEN JSONDATA: ", count)

print("[WRITING DATA IN JSON]")

subpopulationCategory = ['Yes']
veteransSubpopulation = ['Veteran Yes']
ageCategory = ('youth', 'Under24')
ageSubpopulation = ['Youth (18-24)']

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

def get_Total_Veterans(in_df, year):
    interview =  in_df.loc[lambda df: ((df['United States Armed Forces'] == 'Yes') & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"year": str(year) ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation),"total": str(interview + observation) ,"subpopulation": 'Veteran Yes', 'sheltered': "False"}

def get_Total_Youth(in_df, year):
    # interview =  in_df.loc[lambda df: (((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) & (df['Household Survey Type'] == 'Interview') ), :].shape[0]
    # observation = in_df.loc[lambda df: ((df['Age Observed'] == 'Under24') & (df['Household Survey Type'] == 'Interview') ), :].shape[0]


    interview =  in_df.loc[lambda df: (((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) & (df['Household Survey Type'] == 'Interview' )), :].shape[0]
    observation = in_df.loc[lambda df: ((df['Age Observed'] == 'Under24') & (df['Household Survey Type'] == 'Observation')), :].shape[0]

    return {"year": year ,"category": "Age", "interview": str(interview) ,"observation": str(observation), "total" : str(interview + observation), "subpopulation": 'Youth (18-24)', 'sheltered': "False"}

def get_Total_ChronicHomeless(in_df,year):
    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1) &(df['ParentGlobalID'].notnull()) )\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['ParentGlobalID'].notnull()))\
            # | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()
    
    interview = total_persons
    observation = 0
    
    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation) , "subpopulation": 'Chronically Homeless', 'sheltered': "False"}
 
def get_Total_Interview_withChild(in_df, year):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['ParentGlobalID'].notnull()) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['ParentGlobalID'].notnull()))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    interview = intersected_df.shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'Families with Children', 'sheltered': "False"}

def get_Total_Elderly(in_df,year):
    interview = in_df.loc[lambda df: (df['Age As Of Today'] >=62)  & (df['ParentGlobalID'].notnull()) & (df['Household Survey Type'] == 'Interview'), :].shape[0]
    observation = 0
    return {"year": year ,"category": "Age", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'Elderly (>62)', 'sheltered': "False"}

def get_SubstanceAbuse(in_df, year):
    interview =  in_df.loc[lambda df: ((df['Substance Abuse'] == "Yes") & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0
    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation),"total": str(interview + observation), "subpopulation": 'Substance Abuse', 'sheltered': "False"}

def get_DomesticViolence(in_df, year):
    interview =  in_df.loc[lambda df: ((df['Domestic Violence Victim'] == 'Yes') & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0
    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation),"total": str(interview + observation), "subpopulation": 'Victim of Domestic Violence', 'sheltered': "False"}

def get_Total_Jail12Months(in_df,year):
    # interview = in_df.loc[lambda df: (df['Jail Or Prison'] == "Yes") | (df['Jail Or Prison'] == "YesTwelveMonths") | (df['Jail Or Prison'] == "YesNinetyDays"), :].shape[0]
    interview = in_df.loc[lambda df: (df['Jail Or Prison'] == "Yes") | (df['Jail Or Prison'] == "YesTwelveMonths") | (df['Jail Or Prison'] == "YesNinetyDays"), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'Jail Release 12 Months', 'sheltered': "False"}

def get_Total_MentalHealthCondition(in_df, year):
    interview =  in_df.loc[lambda df: ((df['Mental Health Issue'] == 'Yes') & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'Mental Health Conditions', 'sheltered': "False"}

def get_Total_AIDSorHIV(in_df, year):
    interview =  in_df.loc[lambda df: ((df['HIV/AIDS'] == 'Yes') & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'AIDS or HIV', 'sheltered': "False"}

def get_Total_PTSD(in_df, year):
    interview =  in_df.loc[lambda df: ((df['PTSD'] == 'Yes') & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'PTSD', 'sheltered': "False"}

def get_Total_BrainInjury(in_df, year):
    interview =  in_df.loc[lambda df: ((df['Brain Injury'] == 'Yes') & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": str(interview) ,"observation": str(observation), "total": str(interview + observation), "subpopulation": 'Brain Injury', 'sheltered': "False"}

def get_Total_PetOwner(in_df,year):
    interview = in_df.loc[lambda df: (df['Companion Animal'] == 'Yes') & (df['Number of Animal'] >= 1) & (df['Household Survey Type'] == 'Interview'), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Pet Owner', 'sheltered': "False"}

def get_Total_PetHousing(in_df,year):
    interview = in_df.loc[lambda df: (df['Pet Housing'] == 'Yes') & (df['Companion Animal'] == 'Yes') & (df['Number of Animal'] >= 1) & (df['Household Survey Type'] == 'Interview'), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Pet Housing', 'sheltered': "False"}

def get_Total_FirstTimeHomeless(in_df,year):
    interview = in_df.loc[lambda df: (df['First Time Homeless'] == 'Yes') & (df['Household Survey Type'] == 'Interview'), :].drop_duplicates(subset='GlobalID').shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'First Time Homeless', 'sheltered': "False"}

newData.append({
"fields":  get_Total_Veterans(df, year)
})


newData.append({
"fields":  get_Total_Youth(df,year)
})


newData.append({
        "fields":  get_Total_ChronicHomeless(df,year)
        })


newData.append({
        "fields":  get_Total_Interview_withChild(df,year)
        })


newData.append({
        "fields":  get_Total_Elderly(df,year)
        })


newData.append({
        "fields":  get_SubstanceAbuse(df,year)
        })


newData.append({
        "fields":  get_DomesticViolence(df,year)
        })


newData.append({
        "fields":  get_Total_Jail12Months(df,year)
        })


newData.append({
        "fields":  get_Total_MentalHealthCondition(df,year)
        })


newData.append({
        "fields":  get_Total_AIDSorHIV(df,year)
        })


newData.append({
        "fields":  get_Total_PTSD(df,year)
        })


newData.append({
        "fields":  get_Total_BrainInjury(df,year)
        })


newData.append({
        "fields": get_Total_PetOwner(df,year)
}) 
newData.append({
        "fields": get_Total_PetHousing(df,year)
}) 

newData.append({
    "fields": get_Total_FirstTimeHomeless(df,year)
})


for x in jsonData:
    observation = int(x["fields"]["observation"])
    interview = int(x["fields"]["interview"]) 

    x['fields']['total'] = str(interview + observation)
    x['model'] = model
    x['fields']['_type'] = 'Unsheltered'


    if x['fields']['subpopulation'] == 'Youth (18-24)' and x['fields']['year'] == '2019':
        print("Entered")
        x['fields']['interview'] = str(observation)
        x['fields']['observation'] = str(interview)
        x['fields']['_type'] = 'Unsheltered'
        print("new x  value: ", x['fields'])







jsonFields = [ x["fields"] for x in jsonData]



for d in newData:
    if d['fields'] not in jsonFields:
        print("not found: ", d['fields'])
        count +=1
        d["pk"] = count
        d["model"] = model
        d['fields']['_type'] = 'Unsheltered'
        jsonData.append(d)




out = open('./JSON/2020/SubpopulationsByYear.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()

print("[FINISHED WRITING DATA INTO JSON]")


