#!/bin/sh

 
echo "running dedupe script.... \n\n"
python3 dedupe.py raw_data 2019Survey.csv household.csv 

echo "getting dedupe counts"
python3 SubpopulationsByYearJSON.py 2019 ./final_data/final_data.csv ./countResults/2019Deduped.json utf-8

echo "getting original counts"
python3 SubpopulationsByYearJSON.py 2019 ./final_data/2019OriginalJoined.csv ./countResults/2019Original.json cp1252

echo "exporting to a side by side view"
 python3 SideBySideView.py ./countResults/2019Deduped.json ./countResults/2019Original.json