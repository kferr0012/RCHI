
'''
My Assumptions:

1) How my code works is that the helperfunction gets every every ParentGlobalID (removing any duplicates) from all 
Veteran Adult household with at least a child and Adults. The way it gets it is by creating two sets one with Veteran Adults and there ParentGlobalID
and the second set is the ParentGlobalID of childrens. Then it does gets the intersection between the two sets to get the ParentGlobalID that belong in 
both of the sets

2) The rest of the functions use the helperfunction to get all the Veteran Adults with at least a child and adult Household(set 1) ParentGlobalID
and checks if the new set (Set 2) depending of the function is in Set 1 and returns the sum of all true.


## TODO Create some test cases 
Chronically Homeless Function
Wrote them based on the csv column 'Chronically Homeless Status'
'''

import pandas as pd
in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

##* Helper Function that returns total number adults with child 
def helperFunction_Total_num_Veterans_households():
    total_veterans = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes') \
            & (df['Age As Of Today'] >= 18)\
                ,['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')


    children = in_df.loc[lambda df:(df['Age As Of Today'] <= 17) | (df['Age Observed'] == 'Under18')
                    ,['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    intersected_df = pd.merge(total_veterans, children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df


##* Total number of households()
def total_number_of_households():
    total_num_of_households = helperFunction_Total_num_Veterans_households()\
        .drop_duplicates(subset='ParentGlobalID')\
            .shape[0]

    return total_num_of_households

##* Total number of persons
## ? Re-Check This function for other possible methods
def total_number_of_persons():
    households_list = helperFunction_Total_num_Veterans_households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] < 18) | (df['Age As Of Today'] >= 18)))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25')))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()

    # total_persons = in_df['ParentGlobalID'].isin(total_num_veterans['ParentGlobalID']).sum()

    return total_persons

##* Total number of veterans
def total_number_of_veterans():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_veterans_in_HouseHold = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Age As Of Today'] >= 18)\
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_veterans_in_HouseHold

##* Total number of female veteran
def total_number_of_female():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_female = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Gender'] == 'Female')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_female

##* Total number of male veteran
def total_number_of_male():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_male = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Gender'] == 'Male')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()
    
    return total_number_veteran_male

##* Total number of Transgender veteran
def total_number_of_transgender():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_transgender = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & ((df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_transgender

##* Total number of Gender Non-Conforming veteran
def total_number_of_gender_non_conforming():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_genderconforming = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Gender'] == 'GenderNonConforming')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_genderconforming

##* Total number of known gender veteran
def total_number_of_gender_known():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_num_of_Veteran_GenderKnown = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Gender'] != 'DoesntKnow')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_Veteran_GenderKnown

##* Total number non latinos/hispanic
def total_number_of_ethnicity_nonlatino():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_non_LatHisp = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Ethnicity'] == 'No')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_non_LatHisp

##* Total number latinos/hispanic
def total_number_of_ethnicity_latino():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_LatHisp = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Ethnicity'] == 'Yes')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_LatHisp

##* Total number Ethnicity Known
def total_number_of_ethnicity_Known():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_num_veteran_Ethnicity_Known= in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Ethnicity'] != 'DoesntKnow')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_veteran_Ethnicity_Known

##* Total number veteran white
def total_number_of_race_white():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_white = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] == 'White')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_white

##* Total number black or african american 
def total_number_of_race_African():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_black = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] == 'Black')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_black

##* Total number Asian
def total_number_of_race_Asian():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_Asian = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] == 'Asian')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_Asian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_americanIndian = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] == 'AmericanIndian')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_americanIndian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_NativeHawaiian = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] == 'NativeHawaiian')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_NativeHawaiian

##* Total number Multiple Races
def total_number_of_race_Multiple():
    total_num_of_households = helperFunction_Total_num_Veterans_households()

    total_number_veteran_Multiple = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] == 'Multiple')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_Multiple

##* Total number race known
def total_number_of_race_known():
    total_num_of_households = helperFunction_Total_num_Veterans_households().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_Known = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['United States Armed Forces'] == 'Yes')\
            & (df['Race'] != 'DoesntKnow')\
                & (df['Age As Of Today'] >= 18)\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_Known

## TODO Create some test cases 
#* Total number of households (Chronically Homeless)
def total_number_of_ChronicallyHomeless():

    households_list =  helperFunction_Total_num_Veterans_households()

    total_number_of_ChronicallyHomeless = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']]

    total_chronic_households = pd.merge(households_list, total_number_of_ChronicallyHomeless, how='inner').drop_duplicates(subset='ParentGlobalID')
    return total_chronic_households.shape[0]

#* Total number of persons(Chronically Homeless)
def total_number_person_chronically_homeless():
    households_list =  helperFunction_Total_num_Veterans_households()

    total_number_of_ChronicallyHomeless = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']]

    total_chronic_households = pd.merge(households_list, total_number_of_ChronicallyHomeless, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] < 18) | (df['Age As Of Today'] >= 18)))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25')))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(total_chronic_households['ParentGlobalID']).sum()
    
    return total_persons


print("---------Unit Testing ---------")

print('\n')
print('--------Total Number Of HouseHolds------------')
print("Total number of households: ", total_number_of_households())
print('\n')

print('--------Total Number Of Persons------------')
print('Total number of persons: ', total_number_of_persons())
print('\n')

print('--------Total Number Of Veterans------------')
print('Total number of veterans: ', total_number_of_veterans())
print('\n')

print("---------Gender (Veteran Only)---------")
print('\n')
print('--------Total Number Of Veterans Female------------')
print('Total number of female veterans: ', total_number_of_female())
print('\n')

print('\n')
print('--------Total Number Of Veterans Male------------')
print('Total number of male veterans: ', total_number_of_male())
print('\n')

print('\n')
print('--------Total Number Of Veterans Transgender------------')
print('Total number of Transgender veterans: ', total_number_of_transgender())
print('\n')

print('\n')
print('--------Total Number Of Veterans Gender Non-conforming------------')
print('Total number of gender non-conforming veterans: ', total_number_of_gender_non_conforming())
print('\n')

print('\n')
print('--------Total Number Of Veterans Gender Known------------')
print('Total number of known veterans: ', total_number_of_gender_known())
print('\n')

print("---------Ethnicity (Veteran Only)---------")
print('\n')

print('--------Total Number Of Veterans Non-Hispanic/Non-Latino------------')
print('Total number of non-hispanic/non-latino: ', total_number_of_ethnicity_nonlatino())
print('\n')

print('--------Total Number Of Veterans Hispanic/Latino------------')
print('Total number of latino/hispanic ', total_number_of_ethnicity_latino())
print('\n')

print('--------Total Number Of Veterans Ethnicity Known------------')
print('Total number of Ethnicity Known ', total_number_of_ethnicity_Known())
print('\n')    


print("---------Race (Veteran Only)---------")
print('\n')

print('--------Total Number Of White-----------')
print('Total number White ', total_number_of_race_white())
print('\n')

print('--------Total Number Of Black or African American-----------')
print('Total number Black or African American ', total_number_of_race_African())
print('\n')

print('--------Total Number Of Asian-----------')
print('Total number Asian ', total_number_of_race_Asian())
print('\n')

print('--------Total Number Of American Indian or Alaska Native-----------')
print('Total number American Indian or Alaska Native ', total_number_of_race_AmericanIndian())
print('\n')

print('--------Total Number Of Native Hawaiian or Other Pacific Islander-----------')
print('Total number Native Hawaiian or Other Pacific Islander ', total_number_of_race_NativeHawiian())
print('\n')

print('--------Total Number Of Multiple Race-----------')
print('Total number Multiple Race ', total_number_of_race_Multiple())
print('\n')

print('--------Total Number Of Race Known-----------')
print('Total number of Race Known ', total_number_of_race_known())
print('\n')

print("---------Chronically Homeless (Veteran Only)---------")
print('\n')


# ##* Ask About the correct value 
print('--------Total number of households (Chronically Homeless)-----------')
print('Total number of households (Chronically Homeless): ', total_number_of_ChronicallyHomeless())
print('\n')

print('--------Total number of persons(Chronically Homeless)-----------')
print('Total number of persons (Chronically Homeless): ', total_number_person_chronically_homeless())
print('\n')



