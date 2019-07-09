import csv

out=open("HouseholdQuestions_Cities_Districts_040119_1300.csv","rb")
data=csv.reader(out)
data=[row for row in data]
out.close()

i = 0

for x in data[0]:
	if x.lower() == 'age as of today':
		ageColInt = i
	if x.lower() == 'age observed':
		ageColObs = i
	elif x.lower() == 'district':
		districtCol = i
	elif x.lower() == 'household survey type':
		groupCol = i
	elif x.lower() == 'cityname':
		cityCol = i
	elif x.lower() == 'parentglobalid':
		parentglobalCol = i
	i = i+1

data.pop(0)

d = [{},{},{},{},{}]
d_obs = [{},{},{},{},{}]
d_obs2 = [{},{},{},{},{}]

countsByCity = [{},{},{},{},{}]

householdsCount = {}

households = set({})

households_obs = set({})

d_over = [{},{},{},{},{}]
households_over = set({})

ho  = {}
ho2 = {}

hoc = {}
ho2c = {}

r = 0

i = 0
for row in data:
	cd = int(row[districtCol])-1

	if row[cityCol] == 'RIVERSIDE':
		r +=1

	if row[parentglobalCol] not in households_over:
		households_over.add(row[parentglobalCol])
		if row[cityCol] in d_over[cd]:
			d_over[cd][row[cityCol]]+=1
		else:
			d_over[cd][row[cityCol]]=1

	if row[cityCol] not in ho:
		ho[row[cityCol]] = {}
		hoc[row[cityCol]] = 0
	if row[parentglobalCol] not in ho[row[cityCol]]:
		ho[row[cityCol]][row[parentglobalCol]] = 1
		hoc[row[cityCol]] += 1 

	ho[row[cityCol]][row[parentglobalCol]] += 1



	if row[groupCol] == 'Interview':
		if row[parentglobalCol] not in households:
			households.add(row[parentglobalCol])
			if row[cityCol] in d[cd]:
				d[cd][row[cityCol]]+=1
			else:
				d[cd][row[cityCol]]=1

		if row[cityCol] not in countsByCity[cd]:
			countsByCity[cd][row[cityCol]] = {}
		if row[parentglobalCol] not in countsByCity[cd][row[cityCol]]:
			countsByCity[cd][row[cityCol]][row[parentglobalCol]] = {'Adults':0, 'Children':0}
		if (int(row[ageColInt]) > 17):
			countsByCity[cd][row[cityCol]][row[parentglobalCol]]['Adults'] += 1
		elif (int(row[ageColInt]) < 18):
			countsByCity[cd][row[cityCol]][row[parentglobalCol]]['Children'] += 1
			print ("child")	
				

		if row[cityCol] not in householdsCount:
			householdsCount[row[cityCol]] = {}
		if row[parentglobalCol] not in householdsCount[row[cityCol]]:
			householdsCount[row[cityCol]][row[parentglobalCol]] = {'Adults':0, 'Children':0}
		if (int(row[ageColInt]) > 17):
			householdsCount[row[cityCol]][row[parentglobalCol]]['Adults'] += 1
		elif (int(row[ageColInt]) < 18):
			householdsCount[row[cityCol]][row[parentglobalCol]]['Children'] += 1
			print ("child")

	else:
		if row[parentglobalCol] not in households_obs:
			households_obs.add(row[parentglobalCol])
			if row[cityCol] in d_obs[cd]:
				d_obs[cd][row[cityCol]]+=1
			else:
				d_obs[cd][row[cityCol]]=1

		if row[parentglobalCol] not in households:
			households.add(row[parentglobalCol])
			if row[cityCol] in d_obs2[cd]:
				d_obs2[cd][row[cityCol]]+=1
			else:
				d_obs2[cd][row[cityCol]]=1

		if row[cityCol] not in ho2:
			ho2[row[cityCol]] = {}
			ho2c[row[cityCol]] = 0
		if row[parentglobalCol] not in ho2[row[cityCol]]:
			ho2[row[cityCol]][row[parentglobalCol]] = 1
			ho2c[row[cityCol]] += 1
		ho2[row[cityCol]][row[parentglobalCol]] += 1

	i+=1

householdsByCity = [{},{},{},{},{}]
householdsNum = [0,0,0,0,0]

for i in range(5):
	#print (i)
	for x in countsByCity[i]:
		#print (x)
		householdsByCity[i][x] = { 'Only Adults':0 , 'Only Children':0 , 'Adults and Children':0 }
		for y in countsByCity[i][x]:
			if int(countsByCity[i][x][y]['Adults']) == 0:
				householdsByCity[i][x]['Only Children'] +=1
				print (y,"child")
				householdsNum[i]+=1
			elif int(countsByCity[i][x][y]['Children']) == 0:
				householdsByCity[i][x]['Only Adults'] +=1
				householdsNum[i]+=1
			else:
				householdsByCity[i][x]['Adults and Children'] +=1
				print (y,"ac")
				householdsNum[i]+=1

print 'Household Totals by District',householdsNum

print d
districthousetots = [[],[],[],[],[]]

out = open('2019cityHouseholdBreakdown.csv','w')
out.write('District,CityName,TotalHouseholds,Adults and Children,Only Adults,Only Children\n')
for i in range(5):
	aTot = 0
	cTot = 0
	acTot = 0
	#print (i+1)
	for x in householdsByCity[i]:
		tot = householdsByCity[i][x]['Adults and Children'] + householdsByCity[i][x]['Only Adults'] + householdsByCity[i][x]['Only Children']
		out.write(str(i+1) + ',' + str(x) + ',' + str(tot) + ',' + str(householdsByCity[i][x]['Adults and Children']) + ',' + str(householdsByCity[i][x]['Only Adults']) + ',' + str(householdsByCity[i][x]['Only Children']) + '\n')
		acTot += householdsByCity[i][x]['Adults and Children']
		aTot += householdsByCity[i][x]['Only Adults']
		cTot += householdsByCity[i][x]['Only Children']
		#print x,householdsByCity[i][x]

	districthousetots[i].append(str(householdsNum[i]))
	districthousetots[i].append(str(acTot))
	districthousetots[i].append(str(aTot))
	districthousetots[i].append(str(cTot))

out.write(',,,,,\n')

for i in range(5):
	out.write(str(i+1) + ',' + 'District Total' + ',' + districthousetots[i][0] + ',' + districthousetots[i][1] + ',' + districthousetots[i][2] + ',' + districthousetots[i][3] + '\n')

out.close()

householdsCount_2 = {}

for x in householdsCount:
	householdsCount_2[x] = { 'Only Adults':0 , 'Only Children':0 , 'Adults and Children':0 }
	for y in householdsCount[x]:
		if int(householdsCount[x][y]['Adults']) == 0:
			householdsCount_2[x]['Only Children'] +=1
			print (y,"child")
		elif int(householdsCount[x][y]['Children']) == 0:
			householdsCount_2[x]['Only Adults'] +=1
		else:
			householdsCount_2[x]['Adults and Children'] +=1
			print (y,"ac")

out = open('2019cityHouseholdBreakdown_noDistricts.csv','w')
out.write('CityName,Adults and Children,Only Adults,Only Children\n')

for x in householdsCount_2:
	out.write(str(x)  + ',' + str(householdsCount_2[x]['Adults and Children']) + ',' + str(householdsCount_2[x]['Only Adults']) + ',' + str(householdsCount_2[x]['Only Children']) + '\n')

out.close()

print 'int3'
print d[0]['RIVERSIDE']
print d[1]['RIVERSIDE']

print 'Obs1'
print d_obs[0]['RIVERSIDE']
print d_obs[1]['RIVERSIDE']

print 'Obs2'
print d_obs2[0]['RIVERSIDE']
print d_obs2[1]['RIVERSIDE']

print 'Total1'
print d_over[0]['RIVERSIDE']
print d_over[1]['RIVERSIDE']

print 'Total and obs'
print hoc['RIVERSIDE']
print ho2c['RIVERSIDE']

print 'riverside record'
print r




