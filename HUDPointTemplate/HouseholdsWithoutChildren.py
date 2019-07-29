'''
My Assumptions:

1)The Gender & Ethnicity & Race counts are based on the households without children.
    It does not include people that do not belong in this households

2)I am assuming that the data set "csv" file is correct and the "P_Child Yes No" column is correct.
    With this columns I can correctly see which Adults belong in a household without children.

3) The number calculated are based on the assumptions above

TODO
Chronically Homeless Function
Wrote them based on the csv column 'Chronically Homeless Status'
'''

import pandas as pd
in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')


# "Adult (over24)" > 0 *or* "Youth(18-24)" > 0) and   ("Children (under 18)" =0 *and* "P_Child Yes No" = No)==> Only Adults

##* Helper Function that returns total number of households
def helperFunction_Total_num_Adults():
    total_Adults = in_df.loc[lambda df:((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
        , ['ParentGlobalID']]\
            .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df: ((df['Age As Of Today'] <= 17) | (df['Age Observed'] == 'Under18')) ,['ParentGlobalID']]\
        .drop_duplicates(subset='ParentGlobalID')


    set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    #set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df


##* Total number of households
def total_number_of_households(): 

    total_num_of_households = helperFunction_Total_num_Adults().shape[0]
    return total_num_of_households

##* Total number of persons  
def total_number_of_persons():

    total_num_of_households = helperFunction_Total_num_Adults()

    total_persons = in_df.loc[lambda df:((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
            , ['ParentGlobalID']]['ParentGlobalID'].isin(total_num_of_households['ParentGlobalID'])\
                .sum()

    return total_persons

##* Total number of young Adults
def total_number_of_youngAdults():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_youngAdults = in_df.loc[lambda df:((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24))\
            , ['ParentGlobalID']]['ParentGlobalID'].isin(total_num_of_households['ParentGlobalID'])\
                .sum()

    return total_youngAdults

#? Ask josh if you should include Observe people also because it only over 25 category
##* Total number of Adults Over 24
def total_number_of_Adults_Over24():
    total_num_of_households = helperFunction_Total_num_Adults().drop_duplicates(subset='ParentGlobalID')

    total_Adults_over24 = in_df.loc[lambda df:((df['Age As Of Today'] >= 25) | (df['Age Observed'] == 'Over25'))\
            , ['ParentGlobalID']]['ParentGlobalID'].isin(total_num_of_households['ParentGlobalID'])\
                .sum()
    return total_Adults_over24

##* Total number of female
def total_number_of_female():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_female = in_df.loc[lambda df:((df['Gender'] == 'Female') | (df['Gender Observed'] == 'Female'))\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_female

##* Total number of male
def total_number_of_male():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_male = in_df.loc[lambda df:((df['Gender'] == 'Male') | (df['Gender Observed'] == 'Male'))\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()
                
    return total_num_of_male

##* Total number of transgender
def total_number_of_transgender():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_transgender = in_df.loc[lambda df:((df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()
                
    return total_num_of_transgender

##* Total number of GenderConforming 
def total_number_of_gender_non_conforming():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_GenderNonConforming = in_df.loc[lambda df: (df['Gender'] == 'GenderNonConforming')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_GenderNonConforming

##* Total number of Known Gender
def total_number_of_gender_known():

    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_GenderKnown = in_df.loc[lambda df: ((df['Gender'] != 'DoesntKnow') | (df['Gender Observed'] != 'NotSure'))\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_GenderKnown

##* Total number of non latinos/hispanics
def total_number_of_ethnicity_nonlatino():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_nonLatHisp = in_df.loc[lambda df:(df['Ethnicity'] == 'No')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_nonLatHisp

##* Total number of latinos/hispanics
def total_number_of_ethnicity_latino():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_LatHisp = in_df.loc[lambda df:(df['Ethnicity'] == 'Yes')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_LatHisp

##* Total number Ethnicity Known
def total_number_of_ethnicity_Known():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_Ethnicity_Known= in_df.loc[lambda df:(df['Ethnicity'] != 'DoesntKnow')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_Ethnicity_Known

##* Total number of white
def total_number_of_race_white():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_White= in_df.loc[lambda df:(df['Race'] == 'White')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_White

##* Total number of Black or African American
def total_number_of_race_African():
    total_num_of_households = helperFunction_Total_num_Adults()
    total_num_of_Black= in_df.loc[lambda df:(df['Race'] == 'Black')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_Black

##* Total number of Asian
def total_number_of_race_Asian():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_Asian= in_df.loc[lambda df:(df['Race'] == 'Asian')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_Asian

##* Total number of American Indian
def total_number_of_race_AmericanIndian():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_AmericanIndian= in_df.loc[lambda df: (df['Race'] == 'AmericanIndian')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_AmericanIndian

##* Total number of Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_NativeHawiian= in_df.loc[lambda df: (df['Race'] == 'NativeHawaiian')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_NativeHawiian

##* Total number of Multiple Race
def total_number_of_race_Multiple():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_of_MultipleRace= in_df.loc[lambda df: (df['Race'] == 'Multiple')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_of_MultipleRace

##* Total number of Race Known
def total_number_of_race_known():
    total_num_of_households = helperFunction_Total_num_Adults()

    total_num_knownRace= in_df.loc[lambda df: (df['Race'] != 'DoesntKnow')\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()

    return total_num_knownRace

def total_number_of_ChronicallyHomeless():
    total_num_of_households = helperFunction_Total_num_Adults()

    # total_number_of_ChronicallyHomeless = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview')\
    #     &  (df['Chronically Homeless Status'] == 1) & (df['Children (under 18)'] == 0) & ((df['Adult (over 24)'] == 1) | (df['Youth (18-24)'] == 1)\
    #         , ['ParentGlobalID']]['ParentGlobalID']\
    #             .isin(total_number_household['ParentGlobalID']).sum()


    total_number_of_ChronicallyHomeless =  in_df.loc[lambda df:(df['Chronically Homeless Status'] == 1)\
                & ((df['Age As Of Today'] >= 18) | (df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25'))\
                    , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(total_num_of_households['ParentGlobalID']).sum()
    

    return total_number_of_ChronicallyHomeless

print("---------Unit Testing ---------")
print('\n')
print("HouseHold Without Children")

print('\n')
print('--------Total Number Of HouseHolds------------')
print("Total number of households: ", total_number_of_households())
print('\n')

print('--------Total Number Of Persons------------')
print('Total number of persons: ', total_number_of_persons())
print('\n')

print('--------Total Number Of Young Adults------------')
print('Total number of Young Adults: ', total_number_of_youngAdults())
print('\n')

print('--------Total Number Of Adults Over 24------------')
print('Total number of Adults Over 24: ', total_number_of_Adults_Over24())
print('\n')

print('--------Total Number Of Female------------')
print('Total number of Female: ', total_number_of_female())
print('\n')

print('--------Total Number Of Male------------')
print('Total number of Male: ', total_number_of_male())
print('\n')

print('--------Total Number Of Transgender------------')
print('Total number of Transgender: ', total_number_of_transgender())
print('\n')

print('--------Total Number Of Gender Non-conforming------------')
print('Total number of gender non-conforming: ', total_number_of_gender_non_conforming())
print('\n')

print('\n')
print('--------Total Number Of Gender Known------------')
print('Total number of known : ', total_number_of_gender_known())
print('\n')

print("---------Ethnicity---------")
print('\n')

print('--------Total Number Of Non-Hispanic/Non-Latino------------')
print('Total number of non-hispanic/non-latino: ', total_number_of_ethnicity_nonlatino())
print('\n')

print('--------Total Number Of  Hispanic/Latino------------')
print('Total number of latino/hispanic ', total_number_of_ethnicity_latino())
print('\n')

print('--------Total Number Of Veterans Ethnicity Known------------')
print('Total number of Ethnicity Known ', total_number_of_ethnicity_Known())
print('\n')  


print("---------Race---------")
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

print("---------Chronically Homeless---------")
print('\n')


##* Ask About the correct value 
print('--------Total Number Of Chronically Homeless Persons-----------')
print('Total number Chronically Homeless\n ', total_number_of_ChronicallyHomeless())
print('\n')