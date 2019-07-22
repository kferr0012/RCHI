'''
My Assumptions:

1)The Gender & Ethnicity & Race counts are based on the veterans in the households without children.
    It does not include veterans in the household with children

2)I am assuming that the data set "csv" file is correct and the "P_Child Yes No" column is correct.
    With this columns I can correctly see which veterans belong in a household without children.

3) The number calculated are based on the assumptions above and have been doubled checked with the csv file 

TODO
Chronically Homeless Function
Wrote them based on the csv column 'Chronically Homeless Status'
'''


import pandas as pd

in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

##* This Scripts contains the template for veterans without children 

##* Helper Function that returns total number of veterans with no child
def helperFunction_Total_num_Veterans():
    total_veterans = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
            & (df['Veteran'] == 1) \
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        ,['ParentGlobalID']]
    
    return total_veterans

##* Total number of households 
def total_number_of_households(): 

    total_num_of_households = helperFunction_Total_num_Veterans()\
        .drop_duplicates(subset='ParentGlobalID')\
            .shape[0]

    return total_num_of_households

##* Total number of persons
def total_number_of_persons():

    total_num_veterans = helperFunction_Total_num_Veterans()

    total_non_veterans = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 0)\
            & (df['P_Child Yes No'] == 'No')\
                & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                , ['ParentGlobalID']]['ParentGlobalID'].isin(total_num_veterans['ParentGlobalID'])\
                    .sum()


    return total_non_veterans + total_num_veterans.shape[0]
    # return veterns_ID.shape[0] + non_Veterns_ID.shape[0]

##* Total number of veterans
def total_number_of_veterans():
    total_num_veterans = helperFunction_Total_num_Veterans().shape[0]

    # total_veterans_in_HouseHold = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
    #     & (df['Veteran'] == 1) & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
    #         , ['ParentGlobalID']]['ParentGlobalID']\
    #             .isin(HouseHolds_ParentID['ParentGlobalID'])\
    #                 .sum()

    return total_num_veterans

##* Total number of female veteran
def total_number_of_female():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_female = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            & (df['Gender'] == 'Female')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_female

##* Total number of male veteran
def total_number_of_male():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_male = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Gender'] == 'Male')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()
    
    return total_number_veteran_male

##* Total number of Transgender veteran
def total_number_of_transgender():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_transgender = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  ((df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_transgender

##* Total number of GenderConforming veteran
def total_number_of_gender_non_conforming():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_genderconforming = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Gender'] == 'GenderNonConforming')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_genderconforming

##* Total number of known gender veteran
def total_number_of_gender_known():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_num_of_Veteran_GenderKnown = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Gender'] != 'DoesntKnow')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_Veteran_GenderKnown

##* Total number non latinos/hispanic
def total_number_of_ethnicity_nonlatino():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_non_LatHisp = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Ethnicity'] == 'No')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_non_LatHisp

##* Total number latinos/hispanic
def total_number_of_ethnicity_latino():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_LatHisp = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Ethnicity'] == 'Yes')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_LatHisp

##* Total number Ethnicity Known
def total_number_of_ethnicity_Known():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_num_veteran_Ethnicity_Known= in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Ethnicity'] != 'DoesntKnow')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_veteran_Ethnicity_Known

##* Total number veteran white
def total_number_of_race_white():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_white = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] == 'White')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_white

##* Total number black or african american 
def total_number_of_race_African():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_black = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] == 'Black')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_black

##* Total number Asian
def total_number_of_race_Asian():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_Asian = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] == 'Asian')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_Asian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_americanIndian = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] == 'AmericanIndian')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_americanIndian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_NativeHawaiian = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] == 'NativeHawaiian')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_NativeHawaiian

##* Total number Multiple Races
def total_number_of_race_Multiple():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_Multiple = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] == 'Multiple')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_Multiple

##* Total number race known
def total_number_of_race_known():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    total_number_veteran_Known = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['Veteran'] == 1)\
            &  (df['Race'] != 'DoesntKnow')\
                & (df['P_Child Yes No'] == 'No')\
                    & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                        , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_number_veteran_Known

def total_number_of_ChronicallyHomeless():
    total_num_of_households = helperFunction_Total_num_Veterans().drop_duplicates(subset='ParentGlobalID')

    # total_number_of_ChronicallyHomeless = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
    #     &  (df['Chronically Homeless Status'] == 1) & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
    #         , ['ParentGlobalID']]['ParentGlobalID']\
    #             .isin(total_number_household['ParentGlobalID']).sum()


    total_number_of_ChronicallyHomeless =  in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
        & (df['P_Child Yes No'] == 'No')\
            & (df['Chronically Homeless Status'] == 1)\
                & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1))\
                    , ['ParentGlobalID']]['ParentGlobalID'].isin(total_num_of_households['ParentGlobalID'])\
                        .sum()

    

    return total_number_of_ChronicallyHomeless


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


##* Ask About the correct value 
print('--------Total Number Of Chronically Homsless Persons-----------')
print('Total number Chronically Homeless\n ', total_number_of_ChronicallyHomeless())
print('\n')