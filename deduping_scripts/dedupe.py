#this is the deduping script
import pandas as pd
import numpy as np
import sys
import time
import re
from datetime import datetime
from datetime import timedelta  
from pathlib import Path

from parameters import param

data = pd.DataFrame()
remove_log = pd.DataFrame(columns=['ParentGlobalID', 'GlobalID_C', 'Action', 'Proof'])
check_log = pd.DataFrame()
check_list = list()

#------------joining two data files into one------------------------------ 

def readCSV(folderName, parentFile, childFile):
    global data
    global check_log

    try:
        data_folder = Path(folderName + "/")
        parent_filepath = data_folder / parentFile
        child_filepath = data_folder / childFile
        print("[LOADING DATA]")
        print('...Parent file: ', parent_filepath)
        print('...Child file: ', child_filepath)
    except IndexError:
    	print('[ERROR] Script ran in wrong format. \nFormat:python3 dedupe.py [FOLDERNAME] [PARENTFILE] [CHILDFILE]')

    parent_data = pd.read_csv(parent_filepath, encoding = 'utf-8',escapechar='\\', error_bad_lines=False)
    child_data = pd.read_csv(child_filepath, encoding = 'utf-8',escapechar='\\', error_bad_lines=False) 
    parent_data['ParentGlobalID'] = parent_data['GlobalID']
    parent_data = parent_data.rename(columns=lambda x: re.sub(r'^(.*)$', r'P_\1', x) if x != 'ParentGlobalID' else x)
    print("...parent data shape: ", parent_data.shape)
    print("...child data shape: ", child_data.shape)

    print("[JOINING DATA]")
    data = pd.merge(child_data, parent_data, on='ParentGlobalID', how='outer', suffixes=('_C','_P'))
    data.columns = data.columns.str.strip().str.replace(' ', '_')
    
    data.to_csv("raw_data/joined_data_initial.csv", sep=',', encoding='utf-8', index=False)
        
    check_mismatched_parent_id()
    create_check_log()

    print("...joined data shape:", data.shape)

def create_check_log():
    check_log = pd.DataFrame(columns=data.columns)
    check_log.insert(0, 'Entire_Data_Point_To_The_Right', "   ->   ") 
    check_log.insert(0, 'Proof', 0)
    check_log.insert(0, 'Action', 0)
    check_log.insert(0, 'Check_GlobalID', 0)
    check_log.insert(0, 'Check_ParentGlobalID', 0)

def check_mismatched_parent_id():
    query_string = "P_GlobalID != ParentGlobalID"
    df_toCheck = data.query(query_string)
    df_toCheck.to_csv("data_to_check/mismatched_parent_id.csv", sep=',', encoding='utf-8', index=False)
    if (df_toCheck.shape[0] > 0):
        print("[ERROR] Data incorrectly joined. Refer to data_to_check/mismatched_parent_id.csv to manually fix issue")
    else:
        print("...success! data joined correctly")

#---------------dedupe functions for populating remove log----------------

def update_remove_log(df_toRemove, action, proof_col, proof_col_bool=True):
    global remove_log

    print("[R UPDATING] remove_log with " + action)
    remove_log_current = df_toRemove[['ParentGlobalID', 'GlobalID']]
    remove_log_current['Action'] = str(action)

    if proof_col_bool == True:
        remove_log_current['Proof'] = df_toRemove[proof_col].apply(lambda x: str(x))
    else:
        remove_log_current['Proof'] = str(proof_col)
    
    print("...adding " + str(remove_log_current.shape[0]) + " rows to remove_log size " + str(remove_log.shape[0]))
    remove_log = remove_log.append(remove_log_current, ignore_index = True, sort=False)
    print("...success! remove_log new size: " + str(remove_log.shape[0]))

    unique_remove_log_name = "remove_log_" + action.strip().replace(' ', '_').lower()
    unique_remove_log_path = "data_to_delete/unique_remove_logs/" + unique_remove_log_name + ".csv"
    remove_log_current.to_csv(unique_remove_log_path, sep=',', encoding='utf-8', index=False)
    remove_log.to_csv("data_to_delete/remove_log.csv", sep=',', encoding='utf-8', index=False)

    return remove_log_current

def update_check_log(df_toCheck, action, proof_col, proof_col_bool=True):
    global check_log

    print("[C UPDATING] check_log with " + action)
   # check_log_current = pd.DataFrame(columns=check_log.columns)
    check_log_current = df_toCheck
    check_log_current[['Check_ParentGlobalID', 'Check_GlobalID']] = df_toCheck[['ParentGlobalID', 'GlobalID']]
    check_log_current['Action'] = str(action)

    if proof_col_bool == True:
        check_log_current['Proof'] = df_toCheck[proof_col].apply(lambda x: str(x))
    else:
        check_log_current['Proof'] = str(proof_col)
    
    inserted_cols = ['Check_ParentGlobalID', 'Check_GlobalID', 'Action', 'Proof', 'Entire_Data_Point_To_The_Right']
    cols = ([col for col in inserted_cols if col in check_log_current] + [col for col in check_log_current if col not in inserted_cols])
    check_log_current = check_log_current[cols]

    print("...adding " + str(check_log_current.shape[0]) + " rows to check_log size " + str(check_log.shape[0]))
    check_log = check_log.append(check_log_current, ignore_index = True, sort=False)
    print("...success! check_log new size: " + str(check_log.shape[0]))

    unique_check_log_name = "check_log_" + action.strip().replace(' ', '_').lower()
    unique_check_log_path = "data_to_check/unique_check_logs/" + unique_check_log_name + ".csv"

    check_log_current.to_csv(unique_check_log_path, sep=',', encoding='utf-8', index=False)
    check_log.to_csv("data_to_check/check_log.csv", sep=',', encoding='utf-8', index=False)

    return check_log_current

#1
def remove_invalid_date():
    global data
    global check_list

    month = (param.SURVEY_DATE[0:2])
    day = (param.SURVEY_DATE[3:5])
    year = (param.SURVEY_DATE[6:10])
    hour = (param.SURVEY_START_TIME[0])

    date_string = year + '-' + month + '-' + day + " " + hour + ":00 AM"
    format = '%Y-%m-%d %I:%M %p'

    survey_start_date = datetime.strptime(date_string, format)
    survey_end_date = survey_start_date + timedelta(days=7)

    data['P_CreationDate'] = pd.to_datetime(data['P_CreationDate'], format='%m/%d/%Y %I:%M:%S %p')

    index_early = data[(data['P_CreationDate'] < survey_start_date)].index
    df_toRemove = data.iloc[index_early]
    update_remove_log(df_toRemove, "Early Survey Date", 'P_CreationDate')

    index_late = data[(data['P_CreationDate'] > survey_end_date)].index
    df_toRemove = data.iloc[index_late]
    update_remove_log(df_toRemove, "Late Survey Date", 'P_CreationDate')

    check_list.append("[CHECK] Valid survey dates should be double checked. Refer to data_to_delete/unique_remove_logs/remove_log_invalid_survey_date to test dates outside of:" + str(survey_start_date) + "to" + str(survey_end_date))

#2
def remove_unknown_survey_type():
    df_toRemove = data.query('P_Survey_Type not in ["Interview", "Observation"]')
    update_remove_log(df_toRemove, "Unknown Survey Type", 'P_Survey_Type')

#3
def remove_invalid_living_situation():
    global check_list

    df_check = data.query('P_Living_Situation in ["Other"]')
    update_check_log(df_check, 'Other Living Situation', 'P_Living_Situation_Other')
   # df_check.to_csv("data_to_check/living_situation.csv", sep=',', encoding='utf-8', index=False)
    if (df_check.shape[0] > 0):
        check_list.append(("[CHECK] " + str(df_check.shape[0])+" irregular living situations detected. Refer to data_to_check/unique_remove_logs/check_log_other_living_situation.csv to manually fix inconsistency"))
    
    df_toRemove = data.query('P_Living_Situation in ["EmergencyShelter","Motel", "Hotel", "Transitional Housing"]')
    update_remove_log(df_toRemove, "Invalid Living Situation", 'P_Living_Situation')

#4
def remove_empty_living_situation_for_survey_type(survey_type):
    query_string = "P_Survey_Type in \"" + survey_type + "\" and P_Living_Situation != P_Living_Situation"
    df_toRemove = data.query(query_string)
    update_remove_log(df_toRemove, "Empty Living Situation", 'P_Living_Situation')

def duplicate_info_indepth(x):
    info_str = str("First Initial: " + str(x.First_Name_Initial) + ", Last Initial: " + str(x.Last_Name_Initial) + "\nEthnicity: " + str(x.Ethnicity) + ", Gender: " + str(x.Gender) + "\nAge: " + str(x.Age_As_Of_Today) + ", Veteran: " + str(x.Veteran))
    return info_str

def duplicate_info_short(x):
    info_str = str("First Last: " + str(x.First_Name_Initial) + " " + str(x.Last_Name_Initial) + ", Age: " + str(x.Age_As_Of_Today) + "\nE: " + str(x.Ethnicity) + ", G: " + str(x.Gender) + ", Vet: " + str(x.Veteran))
    return info_str

#5 (based off of the HUD definition of a duplicate record)
def remove_duplicate_records():
    global check_list

    df_toRemove = data[data.P_Survey_Type == 'Interview']
    
    #we are removing only the duplicates of original records, so we need to sepparately keep track of both the duplicates AND original record for easy human verification
    df_fullDupeBool = df_toRemove.duplicated(subset=['First_Name_Initial','Last_Name_Initial', 'Ethnicity', 'Gender', 'Age_As_Of_Today', 'Veteran'], keep=False)
    index = df_fullDupeBool[df_fullDupeBool == True].index
    df_fullDuplicateRecordsInfo = data.iloc[index]
    df_fullDuplicateRecordsInfo['info'] = df_fullDuplicateRecordsInfo.apply(lambda x: duplicate_info_indepth(x), axis=1)
    update_check_log(df_fullDuplicateRecordsInfo, 'Duplicate And Original Records', 'info')
   # df_fullDuplicateRecordsInfo[['P_Survey_Type','ParentGlobalID', 'P_GlobalID', 'info']].to_csv("data_to_check/duplicate_and original_records.csv", sep=',', encoding='utf-8', index=False)
    check_list.append("[CHECK] Duplicated Records should be verified manually to have a duplicate. Refer to data_to_check/unique_check_logs/duplicate_and original_records.csv for original + duplicate file")
    
    #now we can proceed to identify just the duplicates to delete
    df_dupeBool = df_toRemove.duplicated(subset=['First_Name_Initial','Last_Name_Initial', 'Ethnicity', 'Gender', 'Age_As_Of_Today', 'Veteran'], keep='first')
    index = df_dupeBool[df_dupeBool == True].index
    df_toRemove = data.iloc[index]
    df_toRemove['info'] = df_toRemove.apply(lambda x: duplicate_info_short(x), axis=1)
    update_remove_log(df_toRemove, "Duplicate Record", 'info')

#6
def remove_already_surveyed():
    df_toRemove = data.query('P_Already_Surveyed in ["Yes"]')
    update_remove_log(df_toRemove, "Already Surveyed", 'P_Already_Surveyed')

#7
def remove_non_homeless():
    df_check = data.query('Is_Person_Homeless in ["NotSure"]')
    update_check_log(df_check, 'Is Homeless', 'Is_Person_Homeless')
    #df_check.to_csv("data_to_check/living_situation.csv", sep=',', encoding='utf-8', index=False)
    if (df_check.shape[0] > 0):
        check_list.append(("[CHECK] " + str(df_check.shape[0])+" potentially not homeless detected. Refer to data_to_check/unique_remove_logs/check_log_is_homeless.csv to manually fix inconsistency"))
    

#---------------deduping combined data file-------------------------------

def dedupe_remove_log():
    global remove_log

    print("[R DEDUPING] remove_log from multi-issue entries")
    print("...old size: ", remove_log.shape)
    remove_log = remove_log.drop_duplicates(subset=['ParentGlobalID', 'GlobalID'])
    print("...remove_log new size: ", remove_log.shape)
    remove_log.to_csv("data_to_delete/deduped_remove_log.csv", sep=',', encoding='utf-8', index=False)
    print("...success! added deduped_remove_log to data_to_delete folder")

def dedupe_check_log():
    global check_log

    print("[C DEDUPING] check_log from multi-issue entries")
    print("...old size: ", check_log.shape)
    check_log = check_log.drop_duplicates(subset=['ParentGlobalID', 'GlobalID'])
    print("...check_log new size: ", check_log.shape)
    check_log.to_csv("data_to_check/deduped_check_log.csv", sep=',', encoding='utf-8', index=False)
    print("...success! added deduped_check_log to data_to_check folder")

def delete_bad_data():
    global data
    global remove_log

    print("[DELETING] data based on final_remove_log")
    print("...old data size: ", data.shape)
    
    #deleting entries listed in remove_log from data
    deduped_data = pd.merge(data, remove_log, how='outer', on=['ParentGlobalID', 'GlobalID'], indicator=True)
    deduped_data = deduped_data.loc[deduped_data._merge == 'left_only']

    print("...final_remove_log contained " + str(len(remove_log)) + " entries")
    print("...deduped data new size: ", deduped_data.shape)

    if (len(data) - len(remove_log) == len(deduped_data)):
        #updating data
        data = deduped_data
        deduped_data.to_csv("final_data/deduped_data.csv", sep=',', encoding='utf-8', index=False)        
        print("...success! data now contains deduped data")
    else:
        print("[ERROR] incorrect number of data points removed, check file final_data/deduped_data.csv")

#--------------fixing deduped data file to original look------------------

def remove_data_cols(r_cols):
    global data
    data = data.drop(columns=r_cols)

def Diff(li1, li2): 
    return (list(set(li1) - set(li2))) 

def fix_naming_conventions():
    global data
    global check_list

    data = data.rename(columns=lambda x: re.sub(r'^(.*)_C$', r'\1', x))
    data = data.rename(columns=lambda x: re.sub(r'^P_(.*)$', r'P-\1', x))
    data.columns = data.columns.str.strip().str.replace('_', ' ')
    data = data.rename(columns=lambda x: re.sub(r'^P-(.*)$', r'P_\1', x))
    
    official_data = pd.read_csv("raw_data/official_2019_data.csv", encoding = 'utf-8') 
    official_cols = official_data.columns.values
    data_cols = data.columns.values
    diff_title = ["List of Mismatched Columns From Official and Unofficial Data"]
    diff = diff_title + Diff(official_cols, data_cols)
    df_diff = pd.Series((diff))
    if(len(diff) >= 1):
        check_list.append("[CHECK] Columns from official data file and created data file do not match. Refer to data_to_check/unique_remove_logs/mismatched_columns.csv for list of mismatched columns")
    else:
        pass
    df_diff.to_csv("data_to_check/mismatched_columns.csv", sep=',', encoding='utf-8', index=False, header=False)     

def fix_final_data_columns():
    global data

    cols_to_remove = ['Action', 'Proof', ' merge']
    remove_data_cols(cols_to_remove)
    fix_naming_conventions()

def create_final_data_file():
    global data
    print("\n[CREATING FINAL DATA FILE]")
    print("...final data size: ", data.shape)
    data.to_csv("final_data/final_data.csv", sep=',', encoding='utf-8', index=False)        
    print("...success! final_data located in final_data folder")

def show_final_check():
    global check_list
    
    for x in range(len(check_list)): 
        print(check_list[x])

if __name__ == "__main__":
    pd.options.mode.chained_assignment = None
    print('[START SCRIPT]\n')
   #------------joining two data files into one------------------------------ 
    print('[--Joining Original Data Files--]\n')
    try:
        data_folder = sys.argv[1]
        parent_filepath = sys.argv[2]
        child_filepath = sys.argv[3]
        readCSV(data_folder, parent_filepath, child_filepath)
    except IndexError:
    	print('ERROR: Script ran in wrong format. \nFormat:python3 dedupe.py [FOLDERNAME] [PARENTFILE] [CHILDFILE]')
        #start example: $python3 dedupe.py raw_data 2019Survey.csv household.csv
    print('[--Joining Original Data Files Complete--]\n')
    #---------------dedupe functions for populating remove log----------------
    print('\n[--Populating remove_log & check_log--]\n')
    remove_invalid_date()
    remove_unknown_survey_type()
    remove_invalid_living_situation()
    remove_empty_living_situation_for_survey_type("Interview")
    remove_already_surveyed()
    remove_duplicate_records()
    remove_non_homeless()
    print('[--Populating remove_log & check_log Complete--]\n')
    #---------------deduping combined data file-------------------------------
    print('\n[-----Starting Removal-----]\n')
    dedupe_remove_log()
    dedupe_check_log()
    delete_bad_data()
    print('[-----Removal Complete-----]\n')
    #--------------fixing deduped data file to original look------------------
    print('\n[--Starting Final File Fixes--]\n')
    fix_final_data_columns()
    create_final_data_file()
    print('[--Final File Fixes Complete--]\n')
    #--------------what to check for------------------------------------------
    print('[Manual Final Check List]\n')
    show_final_check()
    print('\n[END SCRIPT]')
