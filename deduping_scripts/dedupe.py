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
check_list = list()


def postSetup(folderName):
  global data
  #This does any extra work before dedup.py is processed

  #if 2020 data

  print("SETUPDATA")

  if folderName == "2020_raw_data":
    print("=================REFORMATING 2020 DATA===========================")
    #changing household survey type name in survey data
    getSuggestedColumnNames()
    
    data['Household_Survey_Type'] = data["P_Survey_Type"]

    

    return

def getSuggestedColumnNames():

    #check which columns are not matching 1-1
    print("=================GETTING UNLIKE COLUMN NAMES==========================")
    if(str(sys.argv[1]) == "2020_raw_data"):
        columnRef = pd.read_csv("./raw_data/raw_data_joinedDataColumns.csv")
        df = pd.read_csv("2020_raw_data/2020_raw_data_joinedDataColumns.csv")

        differentColumns = {}
        differentColumns["2020"] = []
        differentColumns["2019"] = []
        #get indices that don't exist in 2020_raw_data that are in 2019 raw data
        for index1, row1 in df.iterrows():
            found = False
            for index2, row2 in columnRef.iterrows():
                
                if row1["columns"] == row2["columns"]:
                    found = True
            if not found:
                differentColumns["2020"].append(row1["columns"])

        #check vice versa
        for index1, row1 in columnRef.iterrows():
            found = False
            for index2, row2 in df.iterrows():
                
                if row1["columns"] == row2["columns"]:
                    found = True
            if not found:
                differentColumns["2019"].append(row1["columns"])

        columnData = [differentColumns["2019"], differentColumns["2020"]]
        pd.DataFrame(columnData, ["2019", "2020"]).T.to_csv("./2020_raw_data/differentColumns.csv")

    

    return      

def exportColumnNames():
    global data

    print("=================EXPORTING COLUMN NAMES===========================")

    df = pd.DataFrame(data.columns)
    df.columns = ["columns"]
    df.to_csv("./" + str(sys.argv[1]) + "/" + str(sys.argv[1]) + "_joinedDataColumns.csv")

    return

def formatChecker(filename):

	#get file type
	filename = str(filename)
	_type= filename.split(".")[len(filename.split("."))-1]

	if _type == "xlsx":
		return pd.read_excel(filename)
	elif _type == "csv":
		return pd.read_csv(filename, encoding = 'utf-8')
	else:
		print(_type)
		sys.exit("ERROR: unrecognized formats for " + filename )

def readCSV(folderName, parentFile, childFile):
    global data

    try:
        data_folder = Path(folderName + "/")
        parent_filepath = data_folder / parentFile
        child_filepath = data_folder / childFile
        print("[LOADING DATA]")
        print('...Parent file: ', parent_filepath)
        print('...Child file: ', child_filepath)
    except IndexError:
    	print('[ERROR] Script ran in wrong format. \nFormat:python3 dedupe.py [FOLDERNAME] [PARENTFILE] [CHILDFILE]')
    
    print("getting parent data...")
    parent_data = formatChecker(parent_filepath)
    print("getting child data...")
    child_data = formatChecker(child_filepath)
    
    #make additional formatting changes prior to dedup process

    print("parentdata")
    print(parent_data)
    parent_data['ParentGlobalID'] = parent_data['GlobalID']
    parent_data = parent_data.rename(columns=lambda x: re.sub(r'^(.*)$', r'P_\1', x) if x != 'ParentGlobalID' else x)
    print("...parent data shape: ", parent_data.shape)
    print("...child data shape: ", child_data.shape)

    print("[JOINING DATA]")
    data = pd.merge(child_data, parent_data, on='ParentGlobalID', how='outer', suffixes=('_C','_P'))
    data.columns = data.columns.str.strip().str.replace(' ', '_')
    
    data.to_csv("./" + sys.argv[1] + "/joined_data_initial.csv", sep=',', encoding='utf-8', index=False)
        
    check_mismatched_parent_id()

    print("...joined data shape:", data.shape)

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

    print("[UPDATING] remove_log with " + action)
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

#1
def remove_invalid_date():
    global data
    global check_list
    format = '%Y-%m-%d %I:%M %p'

    #checks out for data: 2019, 2020
    #start date
    month = (param.SURVEY_DATE[str(sys.argv[1])][0:2])
    day = (param.SURVEY_DATE[str(sys.argv[1])][3:5])
    year = (param.SURVEY_DATE[str(sys.argv[1])][6:10])
    hour = (param.SURVEY_START_TIME[str(sys.argv[1])][0])

    start_date_string = year + '-' + month + '-' + day + " " + hour + ":00 AM"
    
    #end date
    month_end = (param.SURVEY_END_DATE[str(sys.argv[1])][0:2])
    day_end = (param.SURVEY_END_DATE[str(sys.argv[1])][3:5])
    year_end = (param.SURVEY_END_DATE[str(sys.argv[1])][6:10])
    hour_end = (param.SURVEY_END_TIME[str(sys.argv[1])][0])

    end_date_string = year_end + '-' + month_end + '-' + day_end + " " + hour_end + ":00 " + param.SURVEY_END_TIME[str(sys.argv[1])][2:4]

    #initialize dates
    survey_start_date = datetime.strptime(start_date_string, format)
    survey_end_date = datetime.strptime(end_date_string, format)

    print("SURVEY TIMES")
    print(survey_start_date)
    print(survey_end_date)

    data['P_CreationDate'] = pd.to_datetime(data['P_CreationDate'], format='%m/%d/%Y %I:%M:%S %p')

    index = data[(data['P_CreationDate'] <= survey_start_date) | (data['P_CreationDate'] >= survey_end_date)].index
    df_toRemove = data.iloc[index]
    update_remove_log(df_toRemove, "Invalid Survey Date", 'P_CreationDate')

    check_list.append("[CHECK] Valid survey dates should be double checked. Refer to data_to_delete/unique_remove_logs/remove_log_invalid_survey_date to test dates outside of:" + str(survey_start_date) + "to" + str(survey_end_date))

#2
def remove_unknown_survey_type():

    #checks out for data: 2019,2020
    df_toRemove = data.query('P_Survey_Type not in ["Interview", "Observation"]')
    update_remove_log(df_toRemove, "Unknown Survey Type", 'P_Survey_Type')

#3
def remove_invalid_living_situation():
    global check_list

    #works for data: 2019, 2020
    df_check = data.query('P_Living_Situation in ["Other"]')
    df_check.to_csv("data_to_check/living_situation.csv", sep=',', encoding='utf-8', index=False)
    if (df_check.shape[0] > 0):
        check_list.append(("[CHECK] Irregular living situations detected. Refer to data_to_check/unique_remove_logs/living_situation.csv to manually fix inconsistency"))
    
    df_toRemove = data.query('P_Living_Situation in ["EmergencyShelter","Motel", "Hotel", "Transitional Housing"]')

    update_remove_log(df_toRemove, "Invalid Living Situation", 'P_Living_Situation')

#4
def remove_empty_living_situation_for_survey_type(survey_type):

    #works for 2019,2020
    query_string = "P_Survey_Type in \"" + survey_type + "\" and P_Living_Situation != P_Living_Situation"
    df_toRemove = data.query(query_string)

    print("emptying living situation removed: ")
    print(df_toRemove)
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

    df_toRemove = data[data.Household_Survey_Type == 'Interview']
    
    #we are removing only the duplicates of original records, so we need to sepparately keep track of both the duplicates AND original record for easy human verification
    df_fullDupeBool = df_toRemove.duplicated(subset=['First_Name_Initial','Last_Name_Initial', 'Ethnicity', 'Gender', 'Age_As_Of_Today', 'Veteran'], keep=False)
    index = df_fullDupeBool[df_fullDupeBool == True].index
    df_fullDuplicateRecordsInfo = data.iloc[index]
    df_fullDuplicateRecordsInfo['info'] = df_fullDuplicateRecordsInfo.apply(lambda x: duplicate_info_indepth(x), axis=1)
    df_fullDuplicateRecordsInfo[['Household_Survey_Type','ParentGlobalID', 'P_GlobalID', 'info']].to_csv("data_to_check/duplicate_and original_records.csv", sep=',', encoding='utf-8', index=False)
    check_list.append("[CHECK] Duplicated Records should be verified manually to have a duplicate. Refer to data_to_check/unique_remove_logs/duplicate_and original_records.csv for original + duplicate file")
    
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

#---------------deduping combined data file-------------------------------

def dedupe_remove_log():
    global remove_log

    print("[DEDUPING] remove_log from multi-issue entries")
    print("...old size: ", remove_log.shape)
    remove_log = remove_log.drop_duplicates(subset=['ParentGlobalID', 'GlobalID'])
    print("...remove_log new size: ", remove_log.shape)
    remove_log.to_csv("data_to_delete/deduped_remove_log.csv", sep=',', encoding='utf-8', index=False)
    print("...success! added deduped_remove_log to data_to_delete folder")

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

    cols_to_remove = ['Action', 'Proof']
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
        
        

        print("args: " + str((data_folder, parent_filepath, child_filepath)))
        readCSV(data_folder, parent_filepath, child_filepath)
    except IndexError:
    	print('ERROR: Script ran in wrong format. \nFormat:python3 dedupe.py [FOLDERNAME] [PARENTFILE] [CHILDFILE]')
        #start example: $python3 dedupe.py raw_data 2019Survey.csv household.csv
    print('[--Joining Original Data Files Complete--]\n')
    #----------------------extra reformatting post process--------------------
    exportColumnNames()
    postSetup(str(data_folder))

    #---------------dedupe functions for populating remove log----------------
    print('\n[--Populating remove_log--]\n')
    remove_invalid_date()
    remove_unknown_survey_type()
    remove_invalid_living_situation()
    remove_empty_living_situation_for_survey_type("Interview")
    remove_already_surveyed()
    remove_duplicate_records()
    print('[--Populating remove_log Complete--]\n')
    #---------------deduping combined data file-------------------------------
    print('\n[-----Starting Removal-----]\n')
    dedupe_remove_log()
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