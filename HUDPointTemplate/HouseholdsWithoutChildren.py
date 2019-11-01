'''
My Assumptions:

1) How my code works is that the helperfunction gets every ParentGlobalID (removing any duplicates) from all 
 household with only Adults. The way it gets it is by creating two sets one with only adults and there ParentGlobalID
and the second set is the ParentGlobalID of children . Then it gets the set difference between the two sets to get the ParentGlobalID that belong in only
the the parentGlobal ID of households with only Adults (set 1)/

2) The rest of the functions use the helperfunction to get the Households of only Adults(set 1) ParentGlobalID
and checks if the new set (Set 2) depending of the function is in Set 1 and returns the sum of all true.

##? For the Helper Function I am Assuming that we are only allowed to use ParentGlobalID column 
##? I am also assuming that the Under24 counts as a Young Adults


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
    total_num_of_persons = total_number_of_persons()
    total_num_of_youngAdults = total_number_of_youngAdults()
    total_num_of_adults_Over24 = total_number_of_Adults_Over24()

    data = {'Households without Children':['Total number of households', 'Total number of persons', 'Number of young adults (age 18 to 24)', 'Number of adults (over age 24)']\
            , 'Unsheltered': [total_num_of_households,total_num_of_persons,total_num_of_youngAdults,total_num_of_adults_Over24]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
    
    return df

def helperFunction_Gender():

    female = total_number_of_female()
    male =  total_number_of_male() 
    transgender = total_number_of_transgender()
    genderNonConforming = total_number_of_gender_non_conforming()

    data = {'Gender':['Female', 'Male', 'Transgender', 'Gender Non-Conforming']\
            , 'Unsheltered': [female,male,transgender,genderNonConforming]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
 

    return df

def helperFunction_Ethnicity():
    non_Latino = total_number_of_ethnicity_nonlatino()
    Latino = total_number_of_ethnicity_latino() 

    data = {'Ethnicity':['Non-Hispanic/Non-Latino', 'Hispanic/Latino']\
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

    data = {'Race':['White', 'Black or African-American', 'Asian', 'American Indian or Alaska Native','Native Hawaiian or Other Pacific Islander','Multiple Races']\
        , 'Unsheltered': [white, black, asian, americanIndian, nativeHawaiian, multiple]}
    
    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

def helperFunction_ChronicallyHomeless():
    total_num_of_chronicallyHomeless = total_number_person_chronically_homeless()

    data = {'Chronically Homeless':['Total number of households (Chronically Homeless)']\
        , 'Unsheltered': [total_num_of_chronicallyHomeless]}

    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

##* HelperFunction Combine Tables for CSV File
def data_Table():
    df0 = helperFunction_HouseHolds_Info()
    df1 = helperFunction_Gender().rename(columns={"Gender": "Households without Children"})
    df2 = helperFunction_Ethnicity().rename(columns={"Ethnicity": "Households without Children"})
    df3 = helperFunction_Race().rename(columns={"Race": "Households without Children"})
    df4 = helperFunction_ChronicallyHomeless().rename(columns={"Chronically Homeless": "Households without Children"})

    result = df0.append([df1,df2, df3,df4]).reset_index(drop=True)
    
    return result

##* Helper Function that returns total number of households
def helperFunction_Total_num_Households():
    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
           | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
           | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | ((df['Age Observed'] == 'NotSure'))))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')


    #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df

##* Total number of households
def total_number_of_households(): 

    total_num_of_households = helperFunction_Total_num_Households().shape[0]
    
    return total_num_of_households

##* Total number of persons  
def total_number_of_persons():

    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25')))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_persons

##* Total number of young Adults (18 -24)
def total_number_of_youngAdults():

    households_list =  helperFunction_Total_num_Households()

    total_youngAdults = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)))\
        | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under24'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_youngAdults

#? Ask josh if you should include Observe people also because it only over 25 category
##* Total number of Adults Over 24
def total_number_of_Adults_Over24():
    households_list =  helperFunction_Total_num_Households()

    total_Adults = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24))\
        | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Over25'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_Adults

##* Total number of female
def total_number_of_female():
    households_list =  helperFunction_Total_num_Households()

    total_female = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'Female'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Gender Observed'] == 'Female'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_female

##* Total number of male
def total_number_of_male():
    households_list =  helperFunction_Total_num_Households()

    total_male = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'Male'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Gender Observed'] == 'Male'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_male

##* Total number of transgender
def total_number_of_transgender():
    households_list =  helperFunction_Total_num_Households()

    total_transgender = in_df.loc[lambda df:\
        ((df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(households_list['ParentGlobalID']).sum()
    
    return total_transgender

##* Total number of GenderConforming 
def total_number_of_gender_non_conforming():
    households_list =  helperFunction_Total_num_Households()

    total_gender_non_conforming = in_df.loc[lambda df:\
       (df['Gender'] == 'GenderNonConforming')\
            , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(households_list['ParentGlobalID']).sum()
    
    return total_gender_non_conforming

##* Total number of Known Gender
def total_number_of_gender_known():
    households_list =  helperFunction_Total_num_Households()

    total_gender_Known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') &(df['Gender'] != 'DoesntKnow'))\
             | ( (df['Household Survey Type'] == 'Observation') &(df['Gender Observed'] != 'NotSure'))\
                 , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(households_list['ParentGlobalID']).sum()
    
    return total_gender_Known

##* Total number of non latinos/hispanics
def total_number_of_ethnicity_nonlatino():
    households_list =  helperFunction_Total_num_Households()

    total_number_non_LatHisp = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'No'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Hispanic Observed'] == 'NonHispanic'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_non_LatHisp

##* Total number of latinos/hispanics
def total_number_of_ethnicity_latino():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'Yes'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Hispanic Observed'] == 'Hispanic'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp

##* Total number of Ethnicity Known
def total_number_of_ethnicity_Known():
    households_list =  helperFunction_Total_num_Households()

    total_EthnicityKnown = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') &(df['Ethnicity'] != 'DoesntKnow'))\
             | ((df['Household Survey Type'] == 'Observation') & (df['Hispanic Observed'] != 'NotSure'))\
                 , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(households_list['ParentGlobalID']).sum()
    
    return total_EthnicityKnown

##* Total number of White
def total_number_of_race_white():
    households_list =  helperFunction_Total_num_Households()

    total_number_white = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'White'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'White'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_white

##* Total number of African 
def total_number_of_race_African():
    households_list =  helperFunction_Total_num_Households()

    total_number_black = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Black'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'Black'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_black

##* Total number of Asian 
def total_number_of_race_Asian():
    households_list =  helperFunction_Total_num_Households()

    total_number_asian = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Asian'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'Asian'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_asian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    households_list =  helperFunction_Total_num_Households()

    total_number_AmericanIndian = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'AmericanIndian'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'AmericanIndian'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_AmericanIndian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    households_list =  helperFunction_Total_num_Households()

    total_number_NativeHawaiian = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'NativeHawaiian'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'NativeHawaiian'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_NativeHawaiian

##* Total number Multiple Race
def total_number_of_race_Multiple():
    households_list =  helperFunction_Total_num_Households()

    total_number_multiple = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Multiple'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'Multiple'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_multiple

##* Total number Race Known
def total_number_of_race_known():
    households_list =  helperFunction_Total_num_Households()

    total_number_of_race_known = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] != 'DoesntKnow'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] != 'NotSure'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_race_known

## TODO Create some test cases 
#* Total number of persons(Chronically Homeless)
def total_number_person_chronically_homeless():
    households_list =  helperFunction_Total_num_Households()

    total_number_of_ChronicallyHomeless = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']]

    total_chronic_households = pd.merge(households_list, total_number_of_ChronicallyHomeless, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >=18) )\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under24') | (df['Age Observed'] == 'Over25')))
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

