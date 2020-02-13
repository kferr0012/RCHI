#!/bin/sh

echo "running dedupe script.... \n\n"
 python3 dedupe.py 2020_raw_data _2020_Point_In_Time_Count_0.csv Individual_Questions_1.xlsx

echo "getting dedupe counts"
python3 SubpopulationsByYearJSON.py 2020 ./final_data/final_data.csv ./countResults/2020Deduped.json utf-8

echo "print dataframe"

python3 SideBySideView.py ./countResults/2020Deduped.json