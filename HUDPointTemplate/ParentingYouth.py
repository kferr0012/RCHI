'''
My Assumptions:

1) How my code works is that the helperfunction gets every ParentGlobalID (removing any duplicates) from a parenting Youth. How I do this is from creating a set with every youth
and filter out any youth that is classified as a child status (Set 1). Create a new set (Set 2 ) of adults in order to do a set difference between set1 and set2 ( set3 ).Create a new set ( set 4)
that contains children and have a child status in order to do a intersection between set3 and set 4 ( set 5 ). Set 5 contains the households that fits the defintion of Parenting Youth household and then remove
any duplicate household. 

Def of Parenting Youth :  A youth who identifies as the parent or legal guardian of one or more children who are present with or sleeping in the same place as that youth parent, where there is no person over age 24 in the household.

In other words a household where the parent or gaurdian is a youth and he or she must contain a child. The household can not contain any adults else it gets discarded. 


2) The rest of the functions use the helperfunction to get the household list( the new set ) and based on the function criteria filter it using the new set. 



## TODO Create some test cases 
Chronically Homeless Function
Wrote them based on the csv column 'Chronically Homeless Status'
'''

import pandas as pd
# in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')
#*  Save to CSV FILE
import tkinter as tk
from tkinter import filedialog
import os
def exportCSV():
    
    export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
    if not export_file_path: # asksaveasfile return `None` if dialog closed with "cancel".
        return
    data_Table().to_csv (export_file_path, index = None, header=True)

def importCSV():
    global in_df
    import_file_path = filedialog.askopenfilename(initialdir = os.getcwd(),filetypes=[("CSV Files",".csv")])
    if import_file_path:
        in_df = pd.read_csv(import_file_path)
        print("Created")

#* Helper Function to create tables for csv file
def helperFunction_HouseHolds_Info():
    total_num_of_households = total_number_of_households()
    total_num_persons = total_number_of_persons()
    total_num_parents = total_number_of_parents()
    total_num_children = total_children_in_Youth_Households()
    total_num_parents_under18 = total_parenting_youth_under18()
    total_num_children_household_under18 = total_children_in_Under18_Households()
    total_num_parents_18to24 = total_parenting_youth_18to24()
    total_num_children_household_18to24 = total_children_in_18to24_Households()

    data = {'Parenting Youth Households':['Total number of parenting youth households','Total number of persons in parenting youth households','Total Parenting Youth (youth parents only)','Total Children in Parenting Youth Households','Number of parenting youth under age 18','Children in households with parenting youth under age 18','Number of parenting youth age 18 to 24','Children in households with parenting youth age 18 to 24']\
            , 'Unsheltered': [total_num_of_households,total_num_persons,total_num_parents,total_num_children,total_num_parents_under18,total_num_children_household_under18,total_num_parents_18to24,total_num_children_household_18to24]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
    
    return df

def helperFunction_Gender():

    female = total_number_of_female()
    male =  total_number_of_male() 
    transgender = total_number_of_transgender()
    genderNonConforming = total_number_of_gender_non_conforming()

    data = {'Gender (youth parents only)':['Female (youth parents only)', 'Male (youth parents only)', 'Transgender (youth parents only)', 'Gender Non-Conforming (youth parents only)']\
            , 'Unsheltered': [female,male,transgender,genderNonConforming]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
 

    return df

def helperFunction_Ethnicity():

    non_Latino = total_number_of_ethnicity_nonlatino()
    Latino = total_number_of_ethnicity_latino() 

    data = {'Ethnicity (youth parents only)':['Non-Hispanic/Non-Latino (youth parents only)', 'Hispanic/Latino (youth parents only)']\
        , 'Unsheltered': [non_Latino, Latino]}
    
    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

def helperFunction_Race():

    white = total_number_of_race_white()
    black = total_number_of_race_African() 
    asian = total_number_of_race_Asian()
    americanIndian = total_number_of_race_AmericanIndian()
    nativeHawaiian = total_number_of_race_NativeHawiian()
    multiple = total_number_of_race_Multiple()

    data = {'Race (youth parents only)':['White (youth parents only)', 'Black or African-American (youth parents only)', 'Asian (youth parents only)', 'American Indian or Alaska Native (youth parents only)','Native Hawaiian or Other Pacific Islander (youth parents only)','Multiple Races (youth parents only)']\
        , 'Unsheltered': [white, black, asian, americanIndian, nativeHawaiian, multiple]}
    
    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

def helperFunction_ChronicallyHomeless():
    total_num_chronicallyHomeless = total_number_person_chronically_homeless()

    data = {'Chronically Homeless':['Total number of households (Chronically Homeless)']\
        , 'Unsheltered': [total_num_chronicallyHomeless]}

    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

##* HelperFunction Combine Tables for CSV File
def data_Table():
    df0 = helperFunction_HouseHolds_Info()
    df1 = helperFunction_Gender().rename(columns={"Gender (youth parents only)": "Parenting Youth Households"})
    df2 = helperFunction_Ethnicity().rename(columns={"Ethnicity (youth parents only)": "Parenting Youth Households"})
    df3 = helperFunction_Race().rename(columns={"Race (youth parents only)": "Parenting Youth Households"})
    df4 = helperFunction_ChronicallyHomeless().rename(columns={"Chronically Homeless": "Parenting Youth Households"})

    result = df0.append([df1,df2, df3,df4]).reset_index(drop=True)
    
    return result

##* Helper Function that returns total number of households
def helperFunction_Total_num_Households():
 
    total_unaccompanied_Youth = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] != 'Child'))\
            ,['ParentGlobalID','Relationship To HoH','Age As Of Today']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    
    total_children_relationship = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    

    # #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_unaccompanied_Youth.merge(total_Adults, indicator=True, how="left", on='ParentGlobalID')[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()
    households_list = pd.merge(set_diff_df, total_children_relationship, how='inner').drop_duplicates(subset='ParentGlobalID')

    return households_list

##* Total number of households
def total_number_of_households(): 

    households_list = helperFunction_Total_num_Households().shape[0]

    return households_list

##* Total number of persons
def total_number_of_persons():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()

    # total_persons = in_df['ParentGlobalID'].isin(households_list['ParentGlobalID']).sum()
    
    return total_persons

##* Total Parenting Youth (youth parents only)
def total_number_of_parents():
    households_list = helperFunction_Total_num_Households()

    total_parents = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_parents

#* Total Children in Parenting Youth Households
def total_children_in_Youth_Households():
    households_list = helperFunction_Total_num_Households()

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_children

#* Number of parenting youth under age 18
def total_parenting_youth_under18():
    households_list = helperFunction_Total_num_Households()

    total_parenting_under18 = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Self'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_parenting_under18

#* Children in households with parenting youth under age 18
def total_children_in_Under18_Households():
    households_list = helperFunction_Total_num_Households()

    under_18 = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Self'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    parents_under18 = pd.merge(under_18, households_list, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(parents_under18['ParentGlobalID']).sum()
    
    return total_children

#* Number of parenting youth age 18 to 24
def total_parenting_youth_18to24():
    households_list = helperFunction_Total_num_Households()

    total_parents_18to24 = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)) & (df['Relationship To HoH'] == 'Self'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    
    return total_parents_18to24

#* Children in households with parenting youth age 18 to 24
def total_children_in_18to24_Households():
    households_list = helperFunction_Total_num_Households()

    total_18to24 = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)) & (df['Relationship To HoH'] == 'Self'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    parents_18to24 = pd.merge(total_18to24, households_list, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(parents_18to24['ParentGlobalID']).sum()
    
    return total_children

##* Total number of female
def total_number_of_female():
    households_list =  helperFunction_Total_num_Households()

    total_female = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'Female') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_female

##* Total number of male
def total_number_of_male():
    households_list =  helperFunction_Total_num_Households()

    total_male = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'Male') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_male

##* Total number of transgender
def total_number_of_transgender():
    households_list =  helperFunction_Total_num_Households()

    total_transgender = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))& (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_transgender

##* Total number of GenderConforming
def total_number_of_gender_non_conforming():
    households_list =  helperFunction_Total_num_Households()

    total_gender_non_conforming = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'GenderNonConforming') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_gender_non_conforming

##* Total number of Known Gender
def total_number_of_gender_known():
    households_list =  helperFunction_Total_num_Households()

    total_gender_Known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') &(df['Gender'] != 'DoesntKnow') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_gender_Known

##* Total number of non latinos/hispanics
def total_number_of_ethnicity_nonlatino():
    households_list =  helperFunction_Total_num_Households()

    total_number_non_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'No') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_number_non_LatHisp

##* Total number of latinos/hispanics
def total_number_of_ethnicity_latino():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'Yes') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp

##* Total number of Ethnicity Known
def total_number_of_ethnicity_Known():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] != 'DoesntKnow') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp

##* Total number of White
def total_number_of_race_white():
    households_list =  helperFunction_Total_num_Households()

    total_number_white = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'White') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_white

##* Total number of African 
def total_number_of_race_African():
    households_list =  helperFunction_Total_num_Households()

    total_number_black = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Black') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_black

##* Total number of Asian 
def total_number_of_race_Asian():
    households_list =  helperFunction_Total_num_Households()

    total_number_asian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Asian') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_asian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    households_list =  helperFunction_Total_num_Households()

    total_number_NativeHawaiian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'NativeHawaiian') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_NativeHawaiian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    households_list =  helperFunction_Total_num_Households()

    total_number_AmericanIndian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'AmericanIndian') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_AmericanIndian

##* Total number Multiple Race
def total_number_of_race_Multiple():
    households_list =  helperFunction_Total_num_Households()

    total_number_multiple = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Multiple') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_multiple

##* Total number Race Known
def total_number_of_race_known():
    households_list =  helperFunction_Total_num_Households()

    total_number_of_race_known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] != 'DoesntKnow') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_race_known

## TODO Create some test cases 
#* Total number of households (Chronically Homeless)
def total_number_of_ChronicallyHomeless():

    households_list =  helperFunction_Total_num_Households()

    total_number_of_ChronicallyHomeless = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']]

    total_chronic_households = pd.merge(households_list, total_number_of_ChronicallyHomeless, how='inner').drop_duplicates(subset='ParentGlobalID')
    return total_chronic_households.shape[0]

#* Total number of persons(Chronically Homeless)
def total_number_person_chronically_homeless():
    households_list =  helperFunction_Total_num_Households()

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

root= tk.Tk()
root.title('Menu')
canvas1 = tk.Canvas(root, width = 300, height = 300, bg = 'seashell3', relief = 'raised')
canvas1.pack()
saveAsButton_CSV = tk.Button(text='Export CSV', command=exportCSV, bg='red', fg='black', font=('helvetica', 15, 'bold'))
loadAsButton_CSV = tk.Button(text='Import CSV', command=importCSV, bg='red', fg='black', font=('helvetica', 15, 'bold'))
cancelButton = tk.Button(text='Cancel',command=root.destroy ,bg='red', fg='black', font=('helvetica', 15, 'bold'))
canvas1.create_window(75, 150, window=loadAsButton_CSV)
canvas1.create_window(225, 150, window=saveAsButton_CSV)
canvas1.create_window(150, 225, window=cancelButton)
root.mainloop()
