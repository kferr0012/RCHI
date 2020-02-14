import pandas as pd
import numpy as np
import json

# df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')
df = pd.read_csv('../Data/2020_Modyfied.csv')


jsonFile = []

# read file
try:
    with open('./JSON/2019/GeneralTableSubpopulations2019.json', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []





year = input("Input Year: ")
model = 'backend.GeneralTableSubpopulations' + year 
data = []
count = len(jsonData)

year = int(year)

print("[CREATING NEW JSON FILE]")


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

raceCategory = [('Asian','Asian'),('AmericanIndian','AmericanIndian'),('Black','Black'),('White','White'),('Multiple','Multiple'),('NativeHawaiian','NativeHawaiian'),('DoesntKnow','NotSure'), 'Total']
raceSubpopulation = ['Asian', 'American Indian', 'Black', 'White', 'Multiple Races', 'Native Hawaiian', 'Unknown Race', 'Total']

ethnicityCategory = [("Yes", "Hispanic"), ("No", "NonHispanic"), ("DoesntKnow", "NotSure"),'Total']
ethnicitySubpopulation = ["Hispanic", "NonHispanic", "Unknown Ethnicity", 'Total']

genderCategory = [('Male','Male'), ('Female','Female'), ('MTF', 'FTM'), ('GenderNonConforming','GenderNonConforming'), ('DoesntKnow','NotSure'), 'Total']
genderSubpopulation = ['Male', 'Female', 'Transgender', 'Gender Non-Conforming', 'Unknown Gender', 'Total']

ageCategory = [('adult', 'Over25'), ('youth', 'Under24'), ('child', 'Under18'), ('DoesntKnow','NotSure'), 'Total']
ageSubpopulation = ['Adults (>24)', 'Youth (18-24)', 'Children (<18)', 'Unknown Age', 'Total']

subpopulationCategory = ['Yes', 'No' , 'DoesntKnow']
veteransSubpopulation = ['Veteran Yes', 'Veteran No']
substanceAbuseSubpopulation = ['Substance Abuse', 'No Substance Abuse', 'Unknown Substance Abuse']
ptsdSubpopulation = ['PTSD', 'No PTSD', 'Unknown PTSD']
mentalHealthSubpopulation = ['Mental Health Conditions', 'No Mental Health Conditions', 'Unknown Mental Health Conditions']
physicalDisabilitySubpopulation = ['Physical Disability', 'No Physical Disability', 'Unknown Physical Disability']
developmentDisabilitySubpopulation = ['Developmental Disability', 'No Developmental Disability', 'Unknown Developmental Disability']
brainInjurySubpopulation =  ['Brain Injury', 'No Brain Injury', 'Unknown Brain Injury']
domesticViolenceSubpopulation = ['Victim of Domestic Violence', 'Not Victim of Domestic Violence','Unknown Victim of Domestic Violence']
aidsOrhivSubpopulation = ['AIDS or HIV', 'No AIDS or HIV' , 'Unknown AIDS or HIV']
jailYesCategory = ['Probation', 'Parole', 'CompletedSentence', 'DoesntKnow']
jail90DaysSubpopulation = ['Jail Release 90 Days: Probation', 'Jail Release 90 Days: Parole', 'Jail Release 90 Days: Completed Sentence', 'Jail Release 90 Days: (Unspecified)']
jail12MonthsSubpopulation = ['Jail Release 12 Months: Probation', 'Jail Release 12 Months: Parole','Jail Release 12 Months: Completed Sentence', 'Jail Release 12 Months: (Unspecified)']
jailCategory = ['No', 'DoesntKnow']
jailNoSubpopulation = ['No Jail', 'Unknown Jail']

livingSituationCategory = ['Woods', 'Vehicle','UnderBridge', 'Street', 'Park', 'Other','Bus','AbandonedBuilding']
livingSituationSubpopulation = ['Woods', 'Vehicle','UnderBridge', 'Street', 'Park', 'Other','Bus','AbandonedBuilding']

def get_race_count(in_df, value, subpopulation,year):

    if subpopulation == 'Total':
        interview = in_df.loc[lambda df:  (df['Household Survey Type'] == 'Interview'), ['Race']].shape[0]
        observation = in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation'), ['Race Observed']].shape[0]
    else:
        interview =  in_df.loc[lambda df: (df['Race'] == value[0]), :].shape[0]
        observation = in_df.loc[lambda df: (df['Race Observed'] == value[1]), :].shape[0]
   
    return {"category": "Race", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_ethnicity_count(in_df, value, subpopulation,year):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview'), ['Ethnicity']].shape[0]
        observation = in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation'), ['Hispanic Observed']].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Ethnicity'] == value[0]) ), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Hispanic Observed'] == value[1])), :].shape[0]

    return {"category": "Ethnicity", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_gender_count(in_df, value, subpopulation,year):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview'), ['Gender']].shape[0]
        observation = in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation'), ['Gender Observed']].shape[0]

    elif value[0] == 'MTF':
        interview =  in_df.loc[lambda df: ((df['Gender'] == value[0]) ), :].shape[0] + in_df.loc[lambda df: ((df['Gender'] == value[1])), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Gender Observed'] == value[0]) ), :].shape[0] + in_df.loc[lambda df: ((df['Gender Observed'] == value[1])), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Gender'] == value[0])), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Gender Observed'] == value[1])), :].shape[0]

    return {"category": "Gender", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_age_count(in_df,value, subpopulation, year):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview'), ['Age As Of Today']].shape[0]
        observation = in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation'), ['Age Observed']].shape[0]

    elif value[0] == 'child':
        interview =  in_df.loc[lambda df: ((df['Age As Of Today'] < 18) ), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Age Observed'] == value[1])), :].shape[0]
    elif value[0] == 'youth':
        interview =  in_df.loc[lambda df: (((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) ), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Age Observed'] == value[1])), :].shape[0]
    elif value[0] == 'adult':
        interview =  in_df.loc[lambda df: ((df['Age As Of Today'] >=25)), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Age Observed'] == value[1])), :].shape[0]
    elif value[0] == 'DoesntKnow':
        interview =  in_df.loc[lambda df: ((df['Age As Of Today'] == value[0])), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Age Observed'] == value[1])), :].shape[0]

    return {"category": "Age", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_Veterans(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['United States Armed Forces'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_ChronicHomeless(in_df,year):

    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview'))\
            # | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()
    
    interview = total_persons
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": 'Chronically Homeless', "total": interview + observation, "year": year}

def get_Total_NotChronicHomeless(in_df,year):
    totalCount = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview') , :].shape[0] 

    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview'))\
            # | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()

    interview = totalCount - total_persons
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": 'Not Chronically Homeless', "total": interview + observation, "year": year}

def get_Total_SubstanceAbuse(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Substance Abuse'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_PTSD(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['PTSD'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_MentalHealthCondition(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Mental Health Issue'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_PhysicalDisability(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Physical Disability'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_DevelopmentDisability(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Developmental Disability'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_BrainInjury (in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Brain Injury'] == value) ), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_DomesticViolence (in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Domestic Violence Victim'] == value) ), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_AidsOrHiv (in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['HIV/AIDS'] == value) ), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_Jail90Days (in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Jail Or Prison'] == 'YesNinetyDays')  & (df['Probation Or Parole'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_Jail12Months (in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Jail Or Prison'] == 'YesTwelveMonths')  & (df['Probation Or Parole'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_NonJailCount (in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['Jail Or Prison'] == value)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_Households_OnlyAdults(in_df,year):
    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    interview = set_diff_df.shape[0]
    observation = 0


    return {"category": "Households", "interview": interview ,"observation": observation, "subpopulation": 'Adults Only', "total": interview + observation, "year": year}

def get_Total_Households_OnlyChildren(in_df,year):
    total_children = in_df.loc[lambda df:\
    ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18)  )\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18)  )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')
    set_diff_df = total_children.merge(total_Adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    interview = set_diff_df.shape[0]
    observation = 0


    return {"category": "Households", "interview": interview ,"observation": observation, "subpopulation": 'Children Only', "total": interview + observation, "year": year}

def get_Total_Households_AdultsandChildren(in_df, year):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) )\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) )\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    interview = intersected_df.shape[0]
    observation = 0

    return {"category": "Households", "interview": interview ,"observation": observation, "subpopulation": 'Adults and Children', "total": interview + observation, "year": year}

def get_Total_LivingSituation(in_df, value, subpopulation, year):
    interview =  in_df.loc[lambda df: ((df['P_Living_Situation'] == value)), :].shape[0]
    observation = 0

    return {"category": "Living Situation", "interview": interview ,"observation": observation, "subpopulation": subpopulation, "total": interview + observation, "year": year}

def get_Total_Households(in_df,year):
    interview =  in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview'), :].shape[0]
    observation =  in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation'), :].shape[0]

    return {"category": "Households", "interview": interview ,"observation": observation, "subpopulation": 'Total', "total": interview + observation, "year": year}

for i in range(len(raceSubpopulation)):
            data.append({
            "fields":  get_race_count(df, raceCategory[i],raceSubpopulation[i],year)
            })
            

for i in range(len(ethnicitySubpopulation)):
            data.append({
            "fields":  get_ethnicity_count(df, ethnicityCategory[i],ethnicitySubpopulation[i],year)
            })
            

for i in range(len(genderSubpopulation)):
            data.append({
            "fields":  get_gender_count(df, genderCategory[i],genderSubpopulation[i],year)
            })
            

for i in range(len(ageSubpopulation)):
            data.append({
            "fields":  get_age_count(df, ageCategory[i],ageSubpopulation[i],year)
            })
            

for i in range(len(veteransSubpopulation)):
            data.append({
            "fields":  get_Total_Veterans(df, subpopulationCategory[i],veteransSubpopulation[i],year)
            })
            

for i in range(len(substanceAbuseSubpopulation)):
            data.append({
            "fields":  get_Total_SubstanceAbuse(df, subpopulationCategory[i],substanceAbuseSubpopulation[i],year)
            })
            

for i in range(len(ptsdSubpopulation)):
            data.append({
            "fields":  get_Total_PTSD(df, subpopulationCategory[i],ptsdSubpopulation[i],year)
            })
            

for i in range(len(mentalHealthSubpopulation)):
            data.append({
            "fields":  get_Total_MentalHealthCondition(df, subpopulationCategory[i],mentalHealthSubpopulation[i],year)
            })
            

for i in range(len(physicalDisabilitySubpopulation)):
            data.append({
            "fields":  get_Total_PhysicalDisability(df, subpopulationCategory[i],physicalDisabilitySubpopulation[i],year)
            })
            

for i in range(len(developmentDisabilitySubpopulation)):
            data.append({
            "fields":  get_Total_DevelopmentDisability(df, subpopulationCategory[i],developmentDisabilitySubpopulation[i],year)
            })
            

for i in range(len(brainInjurySubpopulation)):
            data.append({
            "fields":  get_Total_BrainInjury(df, subpopulationCategory[i],brainInjurySubpopulation[i],year)
            })
            

for i in range(len(domesticViolenceSubpopulation)):
            data.append({
            "fields":  get_Total_DomesticViolence(df, subpopulationCategory[i],domesticViolenceSubpopulation[i],year)
            })
            

for i in range(len(aidsOrhivSubpopulation)):
            data.append({
            "fields":  get_Total_AidsOrHiv(df, subpopulationCategory[i],aidsOrhivSubpopulation[i],year)
            })
            

for i in range(len(jail90DaysSubpopulation)):
            data.append({
            "fields":  get_Total_Jail90Days(df, jailYesCategory[i],jail90DaysSubpopulation[i],year)
            })
            

for i in range(len(jail12MonthsSubpopulation)):
            data.append({
            "fields":  get_Total_Jail12Months(df, jailYesCategory[i],jail12MonthsSubpopulation[i],year)
            })
            

for i in range(len(jailNoSubpopulation)):
            data.append({
            "fields":  get_Total_NonJailCount(df, jailCategory[i],jailNoSubpopulation[i],year)
            })
            

for i in range(len(livingSituationSubpopulation)):
            data.append({
            "fields":  get_Total_LivingSituation(df, livingSituationCategory[i],livingSituationSubpopulation[i],year)
            })
            


data.append({
        "fields":  get_Total_Households(df,year)
        })



data.append({
        "fields":  get_Total_Households_OnlyAdults(df,year)
        })


data.append({
        "fields":  get_Total_Households_OnlyChildren(df,year)
        })


data.append({
        "fields":  get_Total_Households_AdultsandChildren(df,year)
        })


data.append({
        "fields":  get_Total_ChronicHomeless(df,year)
        })


data.append({
        "fields":  get_Total_NotChronicHomeless(df,year)
        })



for x in jsonData:
    x['model'] = model
    x['fields']['year'] = 2019




jsonFields = [ x["fields"] for x in jsonData]



for d in data:
    if d['fields'] not in jsonFields:
        print("not found: ", d['fields'])
        count +=1
        d["pk"] = count
        d["model"] = model
        jsonData.append(d)



out = open('./JSON/2020/GeneralTableSubpopulations.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()


print("[FINISHED CREATING JSON FILE]")