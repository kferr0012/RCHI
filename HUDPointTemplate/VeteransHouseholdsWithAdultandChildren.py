
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
    total_num_of_Veterans = total_number_of_veterans()

    data = {'Veteran Households with at Least One Adult and One Child':['Total number of households','Total number of persons','Total number of veterans']\
            , 'Unsheltered': [total_num_of_households,total_num_of_persons,total_num_of_Veterans]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
    
    return df

def helperFunction_Gender():

    female = total_number_of_female()
    male =  total_number_of_male() 
    transgender = total_number_of_transgender()
    genderNonConforming = total_number_of_gender_non_conforming()

    data = {'Gender (veterans only)':['Female (veterans only)', 'Male (veterans only)', 'Transgender (veterans only)', 'Gender Non-Conforming (veterans only)']\
            , 'Unsheltered': [female,male,transgender,genderNonConforming]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
 

    return df

def helperFunction_Ethnicity():

    non_Latino = total_number_of_ethnicity_nonlatino()
    Latino = total_number_of_ethnicity_latino() 

    data = {'Ethnicity (veterans only)':['Non-Hispanic/Non-Latino (veterans only)', 'Hispanic/Latino (veterans only)']\
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

    data = {'Race (veterans only)':['White (veterans only)', 'Black or African-American (veterans only)', 'Asian (veterans only)', 'American Indian or Alaska Native (veterans only)','Native Hawaiian or Other Pacific Islander (veterans only)','Multiple Races (veterans only)']\
        , 'Unsheltered': [white, black, asian, americanIndian, nativeHawaiian, multiple]}
    
    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

def helperFunction_ChronicallyHomeless():
    total_num_of_chronicallyHomeless_households = total_number_of_ChronicallyHomeless_Households()
    total_num_of_chronicallyHomeless = total_number_person_chronically_homeless()

    data = {'Chronically Homeless':['Total number of households (Chronically Homeless)' , 'Total number of persons (Chronically Homeless)']\
        , 'Unsheltered': [total_num_of_chronicallyHomeless_households, total_num_of_chronicallyHomeless]}

    df = pd.DataFrame(data) 
    df['Unsheltered'] = df['Unsheltered'].astype(int)

    return df

##* HelperFunction Combine Tables for CSV File
def data_Table():
    df0 = helperFunction_HouseHolds_Info()
    df1 = helperFunction_Gender().rename(columns={"Gender (veterans only)": "Veteran Households with at Least One Adult and One Child"})
    df2 = helperFunction_Ethnicity().rename(columns={"Ethnicity (veterans only)": "Veteran Households with at Least One Adult and One Child"})
    df3 = helperFunction_Race().rename(columns={"Race (veterans only)": "Veteran Households with at Least One Adult and One Child"})
    df4 = helperFunction_ChronicallyHomeless().rename(columns={"Chronically Homeless": "Veteran Households with at Least One Adult and One Child"})

    result = df0.append([df1,df2, df3,df4]).reset_index(drop=True)
    
    return result

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
def total_number_of_ChronicallyHomeless_Households():

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

