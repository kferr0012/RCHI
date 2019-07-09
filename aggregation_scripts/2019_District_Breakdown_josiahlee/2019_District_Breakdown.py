import csv

#out=open("2019_PIT_City_Distict_Details.csv","rb")
out=open("HouseholdQuestions_Cities_Districts_040119_1300.csv","rb")


data=csv.reader(out)
data=[row for row in data]
out.close()

d = [{},{},{},{},{}]

for x in d:
 	x.update({'GenderNonConforming': 0, 'Transgender':0, '25+':0 , '18-24': 0, '0-17': 0, 'Unknown Age': 0, 'Vet Yes': 0, 'Vet No':0, 'Doesn\'t Know/Not Sure Gender': 0})

countsByCity = [{},{},{},{},{}]

households = set({})

i = 0

for x in data[0]:
	if x.lower() == 'age as of today':
		ageColInt = i
	if x.lower() == 'age observed':
		ageColObs = i
	elif x.lower() == 'gender':
		genderColInt = i
	elif x.lower() == 'gender observed':
		genderColObs = i
	elif x.lower() == 'district':
		districtCol = i
	elif x.lower() == 'p_survey type':
		groupCol = i
	elif x.lower() == 'veteran':
		vetCol = i
	elif x.lower() == 'cityname':
		cityCol = i
	elif x.lower() == 'parentglobalid':
		parentglobalCol = i
	i = i+1

data.pop(0)

i = 0
for row in data:
	cd = int(row[districtCol])-1

	if row[parentglobalCol] not in households:
		households.add(row[parentglobalCol])
		if 'householdsNum' in d[cd]:
			d[cd]['householdsNum']+=1
		else:
			d[cd]['householdsNum']=1

	if row[cityCol] in countsByCity[cd]:
		countsByCity[cd][row[cityCol]][row[groupCol]] += 1
	else:
		countsByCity[cd][row[cityCol]] = {'Interview':0, 'Observation':0}
		countsByCity[cd][row[cityCol]][row[groupCol]] += 1

	if row[genderColObs] == '':
		if row[genderColInt] in d[cd]:
			d[cd][row[genderColInt]] += 1
		elif row[genderColInt] == 'DoesntKnow':
			d[cd]['Doesn\'t Know/Not Sure Gender']+=1
		elif row[genderColInt] == 'MTF' or row[genderColInt] == 'FTM':
			d[cd]['Transgender']+=1
		else:
			d[cd][row[genderColInt]] = 1
	else:
		if row[genderColObs] in d[cd]:
			d[cd][row[genderColObs]] += 1
		elif row[genderColObs] == 'NotSure':
			d[cd]['Doesn\'t Know/Not Sure Gender']+=1
		else:
			d[cd][row[genderColObs]] = 1

	if row[ageColObs] == '':
		if int(row[ageColInt]) < 18:
			d[cd]['0-17']+= 1
		elif int(row[ageColInt]) < 25 and row[ageColInt] > 17:
			d[cd]['18-24']+= 1
		elif int(row[ageColInt]) > 24:
			d[cd]['25+']+= 1
		else:
			print("ERROR: age as of today column invalid entry")
			break

	elif row[ageColInt] == '':
		if row[ageColObs] == 'Under18':
			d[cd]['0-17']+= 1
		elif row[ageColObs] == 'Under24':
			d[cd]['18-24']+= 1
		elif row[ageColObs] == 'Over25':
			d[cd]['25+']+= 1
		elif row[ageColObs] == 'NotSure':
			d[cd]['Unknown Age']+= 1
		else:
			print("ERROR: age observed invalid entry")
			print(row[ageColObs])
			break
	else:
		print("ERROR age: both age columns full")
		break

	if row[groupCol] in d[cd]:
		d[cd][row[groupCol]] += 1
	else:
		d[cd][row[groupCol]] = 1

	if row[vetCol] == '1':
		d[cd]['Vet Yes'] += 1
	elif row[vetCol] == '0':
		d[cd]['Vet No'] += 1
	else:
		print 'ERROR: INVALID VET FIELD ' + row[vetCol]

	i +=1

#print str(i) + " Total Records"
#print
#i = 0
# for cd in d:
# 	print "distict " + str(i+1)
# 	for x in cd:
# 		print str(cd[x]) + " " + x
# 	print
# 	i+=1

out = open('2019countsByCity.csv','w')
out.write("Distict, CityName, Total Count, Interviewed, Observed\n ")
i = 0
for cd in countsByCity:
	#print "distict " + str(i+1)
	for x in cd:
		#print x + " Total: " + str(cd[x]['Interview'] + cd[x]['Observation']) + " Interview " + str(cd[x]['Interview']) + " Observation " + str(cd[x]['Observation'])
		out.write(str(i+1) + "," + x + "," + str(cd[x]['Interview'] + cd[x]['Observation']) + "," + str(cd[x]['Interview']) + "," + str(cd[x]['Observation']) + "\n")
	#print
	i+=1
out.close()

totalHouseholds = 0
totalRecords = 0
out = open('2019districtBreakdown.csv','w')
out.write("District,Total Count,HouseholdCount,Interview,Observational,Adults (25+),YoungAdults (18-24),Children (<18),Unknown Age,Male,Female,Transgender,Gender Non Conforming,Unknown Gender,Veterans,Non-Veterans\n")
i = 1
for cd in d:
	out.write(str(i) + ',' + str(cd['Interview'] + cd['Observation']) + ',' + str(cd['householdsNum']) + ',' + str(cd['Interview']) + ',' + str(cd['Observation']) + ',' + str(cd['25+']) + ',' + str(cd['18-24']) + ',' + str(cd['0-17']) + ',' + str(cd['Unknown Age']) + ',' + str(cd['Male']) + ',' + str(cd['Female']) + ',' + str(cd['Transgender']) + ',' + str(cd['GenderNonConforming']) + ',' + str(cd['Doesn\'t Know/Not Sure Gender']) + ',' + str(cd['Vet Yes']) + ',' + str(cd['Vet No']) + '\n')
	totalHouseholds+=cd['householdsNum']
	totalRecords+=(cd['Interview'] + cd['Observation'])
	i+=1
out.close()

print str(totalHouseholds) + " Total Unsheltered Households"
print str(totalRecords) + " Total Records"

