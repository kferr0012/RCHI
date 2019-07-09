import csv

out=open("HouseholdQuestions_Cities_Districts_040119_1300.csv","rb")
data=csv.reader(out)
data=[row for row in data]
out.close()

citynames = [
	'BANNING',				
	'BEAUMONT',
	'BLYTHE',
	'CALIMESA',
	'CATHEDRAL CITY',
	'COACHELLA',
	'CORONA',
	'DESERT HOT SPRINGS',
	'HEMET',
	'INDIAN WELLS',
	'INDIO',
	'JURUPA VALLEY',
	'LA QUINTA',
	'LAKE ELSINORE',
	'MENIFEE',
	'MORENO VALLEY',
	'MURRIETA',
	'NORCO',
	'PALM DESERT',
	'PALM SPRINGS',
	'PERRIS',
	'RANCHO MIRAGE',
	'RIVERSIDE',
	'RIVERSIDE 2',
	'RIVERSIDE 1',
	'SAN JACINTO',
	'TEMECULA',
	'WILDOMAR',
	'UNINCORPORATED 1',
	'UNINCORPORATED 2',
	'UNINCORPORATED 3',
	'UNINCORPORATED 4',
	'UNINCORPORATED 5',
]
cities = {
	'BANNING': 				{'District': 5},
	'BEAUMONT': 			{'District': 5},
	'BLYTHE': 				{'District': 4},
	'CALIMESA': 			{'District': 5},
	'CATHEDRAL CITY': 		{'District': 4},
	'COACHELLA': 			{'District': 4},
	'CORONA': 				{'District': 2},
	'DESERT HOT SPRINGS': 	{'District': 4},
	'HEMET': 				{'District': 3},
	'INDIAN WELLS': 		{'District': 4},
	'INDIO': 				{'District': 4},
	'JURUPA VALLEY': 		{'District': 2},
	'LA QUINTA': 			{'District': 4},
	'LAKE ELSINORE': 		{'District': 1},
	'MENIFEE': 				{'District': 5},
	'MORENO VALLEY': 		{'District': 5},
	'MURRIETA': 			{'District': 3},
	'NORCO': 				{'District': 2},
	'PALM DESERT': 			{'District': 4},
	'PALM SPRINGS': 		{'District': 4},
	'PERRIS': 				{'District': 5},
	'RANCHO MIRAGE': 		{'District': 4},
	'RIVERSIDE':			{'District': '1+2'},
	'RIVERSIDE 2': 			{'District': 2},
	'RIVERSIDE 1': 			{'District': 1},
	'SAN JACINTO': 			{'District': 3},
	'TEMECULA': 			{'District': 3},
	'WILDOMAR': 			{'District': 1},
	'UNINCORPORATED 1': 	{'District': 1},
	'UNINCORPORATED 2': 	{'District': 2},
	'UNINCORPORATED 3':		{'District': 3},
	'UNINCORPORATED 4':		{'District': 4},
	'UNINCORPORATED 5':		{'District': 5},
}

for x in citynames:
 	cities[x].update({
 		'Age':	{
	 	    'Youth (18-24)': { 'Interview':0, 'Observation':0 },
		    'Children (<18)': { 'Interview':0, 'Observation':0 },
		    'Adults (>24)': { 'Interview':0, 'Observation':0 },
		    #'Elderly (62+)': { 'Interview':0, 'Observation':0 },
		    'Unknown Age': { 'Interview':0, 'Observation':0 },
 		},
	   	'Race':	{
	   		'Asian': { 'Interview':0, 'Observation':0 },
		   	'Black': { 'Interview':0, 'Observation':0 },
		   	'White': { 'Interview':0, 'Observation':0 },
		   	'American Indian': { 'Interview':0, 'Observation':0 },
		   	'Native Hawaiian': { 'Interview':0, 'Observation':0 },
		   	'Multiple Races': { 'Interview':0, 'Observation':0 },
		   	'Unknown Race': { 'Interview':0, 'Observation':0 },
	   	},
	   	'Ethinicity':	{
	   		'Hispanic': { 'Interview':0, 'Observation':0 },
	   		'NonHispanic': { 'Interview':0, 'Observation':0 },
	   		'Unknown Ethinicity': { 'Interview':0, 'Observation':0 },
	   	},
	   	'Gender':	{
	   		'Male': { 'Interview':0, 'Observation':0 },
		    'Female': { 'Interview':0, 'Observation':0 },
		    'Transgender': { 'Interview':0, 'Observation':0 },
		    'Gender Non-Conforming': { 'Interview':0, 'Observation':0 },
		    'Unknown Gender': { 'Interview':0, 'Observation':0 },
	   	},
	   	'Subpopulations':	{
	   		'Veteran Yes': { 'Interview':0, 'Observation':0 },
		    'Veteran No': { 'Interview':0, 'Observation':0 },
		    'Chronically Homeless': { 'Interview':0, 'Observation':0 },
		    'Not Chronically Homeless': { 'Interview':0, 'Observation':0 },
		    'Substance Abuse': { 'Interview':0, 'Observation':0 },
		    'No Substance Abuse': { 'Interview':0, 'Observation':0 },
		    'Unknown Substance Abuse': { 'Interview':0, 'Observation':0 },
			'PTSD': { 'Interview':0, 'Observation':0 },
			'No PTSD': { 'Interview':0, 'Observation':0 },
			'Unknown PTSD': { 'Interview':0, 'Observation':0 },
			'Mental Health Conditions': { 'Interview':0, 'Observation':0 },
			'No Mental Health Conditions': { 'Interview':0, 'Observation':0 },
			'Unknown Mental Health Conditions': { 'Interview':0, 'Observation':0 },
			'Physical Disability': { 'Interview':0, 'Observation':0 },
			'No Physical Disability': { 'Interview':0, 'Observation':0 },
			'Unknown Physical Disability': { 'Interview':0, 'Observation':0 },
			'Developmental Disability': { 'Interview':0, 'Observation':0 },
			'No Developmental Disability': { 'Interview':0, 'Observation':0 },
			'Unknown Developmental Disability': { 'Interview':0, 'Observation':0 },
			'Brain Injury': { 'Interview':0, 'Observation':0 },
			'No Brain Injury': { 'Interview':0, 'Observation':0 },
			'Unknown Brain Injury': { 'Interview':0, 'Observation':0 },
			'Victim of Domestic Violence': { 'Interview':0, 'Observation':0 },
			'Not Victim of Domestic Violence': { 'Interview':0, 'Observation':0 },
			'Unknown Victim of Domestic Violence': { 'Interview':0, 'Observation':0 },
			'AIDS or HIV': { 'Interview':0, 'Observation':0 },
			'No AIDS or HIV': { 'Interview':0, 'Observation':0 },
			'Unknown AIDS or HIV': { 'Interview':0, 'Observation':0 },
			'Jail Release 90 Days: Probation': { 'Interview':0, 'Observation':0 },
			'Jail Release 90 Days: Parole': { 'Interview':0, 'Observation':0 },
			'Jail Release 90 Days: Completed Sentence': { 'Interview':0, 'Observation':0 },
			'Jail Release 90 Days: (Unspecified)': { 'Interview':0, 'Observation':0 },
			'Jail Release 12 Months: Probation': { 'Interview':0, 'Observation':0 },
			'Jail Release 12 Months: Parole': { 'Interview':0, 'Observation':0 },
			'Jail Release 12 Months: Completed Sentence': { 'Interview':0, 'Observation':0 },
			'Jail Release 12 Months: (Unspecified)': { 'Interview':0, 'Observation':0 },
			'No Jail': { 'Interview':0, 'Observation':0 },
			'Unknown Jail': { 'Interview':0, 'Observation':0 },
	   	},	
	})

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
	elif x.lower() == 'household survey type':
		groupCol = i
	elif x.lower() == 'veteran':
		vetCol = i
	elif x.lower() == 'cityname':
		cityCol = i
	elif x.lower() == 'parentglobalid':
		parentglobalCol = i
	elif x.lower() == 'chronically homeless status':
		chronHomCol = i
	elif x.lower() == 'hispanic observed':
		ethColObs = i
	elif x.lower() == 'ethnicity':
		ethColInt = i
	elif x.lower() == 'race observed':
		raceColObs = i
	elif x.lower() == 'race':
		raceColInt = i
	elif x.lower() == 'physical disability':
		physDisCol = i
	elif x.lower() == 'developmental disability':
		devDisCol = i
	elif x.lower() == 'mental health issue':
		mentalCol = i
	elif x.lower() == 'substance abuse':
		substanceCol = i
	elif x.lower() == 'hiv/aids':
		hivCol = i
	elif x.lower() == 'ptsd':
		ptsdCol = i
	elif x.lower() == 'brain injury':
		brainCol = i
	elif x.lower() == 'domestic violence victim':
		domesticCol = i
	elif x.lower() == 'jail or prison':
		jailCol = i
	elif x.lower() == 'probation or parole':
		paroleCol = i

	i += 1

data.pop(0)

i = 0
for row in data:
	cd = int(row[districtCol])-1
	cc = row[cityCol]
	if cc == 'RIVERSIDE':
		if cd == 0:
			cc = 'RIVERSIDE 1'
		elif cd == 1:
			cc = 'RIVERSIDE 2'
	elif cc == 'UNINCORPORATED':
		if cd == 0:
			cc = 'UNINCORPORATED 1'
		elif cd == 1:
			cc = 'UNINCORPORATED 2'
		elif cd == 2:
			cc = 'UNINCORPORATED 3'
		elif cd == 3:
			cc = 'UNINCORPORATED 4'
		elif cd == 4:
			cc = 'UNINCORPORATED 5'

	if row[groupCol] == 'Interview':

		# if (int(row[ageColInt]) > 61):
		# 	cities[cc]['Age']['Elderly (62+))']['Interview'] += 1
		if (int(row[ageColInt]) > 24):
			cities[cc]['Age']['Adults (>24)']['Interview'] += 1
		elif (int(row[ageColInt]) > 17):
			cities[cc]['Age']['Youth (18-24)']['Interview'] += 1
		elif (int(row[ageColInt]) > -1):
			cities[cc]['Age']['Children (<18)']['Interview'] += 1
		else:
			print 'ERROR: age interview invalid entry' + row[ageColInt]
			break

		if row[genderColInt] == 'Male':
			cities[cc]['Gender']['Male']['Interview'] += 1
		elif row[genderColInt] == 'Female':
			cities[cc]['Gender']['Female']['Interview'] += 1
		elif row[genderColInt] == 'DoesntKnow':
			cities[cc]['Gender']['Unknown Gender']['Interview'] += 1
		elif row[genderColInt] == 'MTF' or row[genderColInt] == 'FTM':
			cities[cc]['Gender']['Transgender']['Interview'] += 1
		elif row[genderColInt] == 'GenderNonConforming':
			cities[cc]['Gender']['Gender Non-Conforming']['Interview'] += 1
		else:
			print 'ERROR: gender interview invalid entry' + row[genderColInt]
			break

		if row[raceColInt] in cities[cc]['Race']:
			cities[cc]['Race'][row[raceColInt]]['Interview'] += 1
		elif row[raceColInt] == 'DoesntKnow':
			cities[cc]['Race']['Unknown Race']['Interview'] += 1
		elif row[raceColInt] == 'Multiple':
			cities[cc]['Race']['Multiple Races']['Interview'] += 1
		elif row[raceColInt] == 'AmericanIndian':
			cities[cc]['Race']['American Indian']['Interview'] += 1
		elif row[raceColInt] == 'NativeHawaiian':
			cities[cc]['Race']['Native Hawaiian']['Interview'] += 1
		else:
			print 'ERROR: race interview invalid entry' + row[raceColInt]
			break

		if row[ethColInt] == 'Yes':
			cities[cc]['Ethinicity']['Hispanic']['Interview'] += 1
		elif row[ethColInt] == 'No':
			cities[cc]['Ethinicity']['NonHispanic']['Interview'] += 1
		elif row[ethColInt] == 'DoesntKnow':
			cities[cc]['Ethinicity']['Unknown Ethinicity']['Interview'] += 1
		else:
			print 'ERROR: eth interview invalid entry' + row[ethColInt]
			break

	elif row[groupCol] == 'Observation':

		if row[ageColObs] == 'Under18':
			cities[cc]['Age']['Children (<18)']['Observation'] += 1
		elif row[ageColObs] == 'Under24':
			cities[cc]['Age']['Youth (18-24)']['Observation'] += 1
		elif row[ageColObs] == 'Over25':
			cities[cc]['Age']['Adults (>24)']['Observation'] += 1
		elif row[ageColObs] == 'NotSure':
			cities[cc]['Age']['Unknown Age']['Observation'] += 1
		else:
			print 'ERROR: age observed invalid entry' + row[ageColObs]
			break

		if row[genderColObs] == 'Male':
			cities[cc]['Gender']['Male']['Observation'] += 1
		elif row[genderColObs] == 'Female':
			cities[cc]['Gender']['Female']['Observation'] += 1
		elif row[genderColObs] == 'NotSure':
			cities[cc]['Gender']['Unknown Gender']['Observation'] += 1
		elif row[genderColObs] == 'MTF' or row[genderColObs] == 'FTM':
			cities[cc]['Gender']['Transgender']['Observation'] += 1
		elif row[genderColObs] == 'GenderNonConforming':
			cities[cc]['Gender']['Gender Non-Conforming']['Observation'] += 1
		else:
			print 'ERROR: gender Observation invalid entry' + row[genderColObs]
			break

		if row[raceColObs] in cities[cc]['Race']:
			cities[cc]['Race'][row[raceColObs]]['Observation'] += 1
		elif row[raceColObs] == 'NotSure':
			cities[cc]['Race']['Unknown Race']['Observation'] += 1
		elif row[raceColObs] == 'Multiple':
			cities[cc]['Race']['Multiple Races']['Observation'] += 1
		elif row[raceColObs] == 'AmericanIndian':
			cities[cc]['Race']['American Indian']['Observation'] += 1
		elif row[raceColObs] == 'NativeHawaiian':
			cities[cc]['Race']['Native Hawaiian']['Observation'] += 1
		else:
			print 'ERROR: race Observation invalid entry' + row[raceColObs]
			break

		if row[ethColObs] == 'Hispanic':
			cities[cc]['Ethinicity']['Hispanic']['Observation'] += 1
		elif row[ethColObs] == 'NonHispanic':
			cities[cc]['Ethinicity']['NonHispanic']['Observation'] += 1
		elif row[ethColObs] == 'NotSure':
			cities[cc]['Ethinicity']['Unknown Ethinicity']['Observation'] += 1
		else:
			print 'ERROR: eth Observation invalid entry' + row[ethColObs]
			break

	if row[vetCol] == '1':
			cities[cc]['Subpopulations']['Veteran Yes'][row[groupCol]] += 1
	elif row[vetCol] == '0':
		cities[cc]['Subpopulations']['Veteran No'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID VET FIELD ' + row[vetCol]
		break

	if row[chronHomCol] == '1':
		cities[cc]['Subpopulations']['Chronically Homeless'][row[groupCol]] += 1
	elif row[chronHomCol] == '0':
		cities[cc]['Subpopulations']['Not Chronically Homeless'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID Chronically Homeless FIELD ' + row[chronHomCol]
		break

	if row[substanceCol] == 'Yes':
		cities[cc]['Subpopulations']['Substance Abuse'][row[groupCol]] += 1
	elif row[substanceCol] == 'No':
		cities[cc]['Subpopulations']['No Substance Abuse'][row[groupCol]] += 1
	elif row[substanceCol] == 'DoesntKnow' or row[substanceCol] == '':
		cities[cc]['Subpopulations']['Unknown Substance Abuse'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID substance FIELD ' + row[substanceCol]
		break

	if row[ptsdCol] == 'Yes':
		cities[cc]['Subpopulations']['PTSD'][row[groupCol]] += 1
	elif row[ptsdCol] == 'No':
		cities[cc]['Subpopulations']['No PTSD'][row[groupCol]] += 1
	elif row[ptsdCol] == 'DoesntKnow' or row[ptsdCol] == '':
		cities[cc]['Subpopulations']['Unknown PTSD'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID ptsd FIELD ' + row[ptsdCol]
		break

	if row[mentalCol] == 'Yes':
		cities[cc]['Subpopulations']['Mental Health Conditions'][row[groupCol]] += 1
	elif row[mentalCol] == 'No':
		cities[cc]['Subpopulations']['No Mental Health Conditions'][row[groupCol]] += 1
	elif row[mentalCol] == 'DoesntKnow' or row[mentalCol] == '':
		cities[cc]['Subpopulations']['Unknown Mental Health Conditions'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID mentalCol FIELD ' + row[mentalCol]
		break

	if row[physDisCol] == 'Yes':
		cities[cc]['Subpopulations']['Physical Disability'][row[groupCol]] += 1
	elif row[physDisCol] == 'No':
		cities[cc]['Subpopulations']['No Physical Disability'][row[groupCol]] += 1
	elif row[physDisCol] == 'DoesntKnow' or row[physDisCol] == '':
		cities[cc]['Subpopulations']['Unknown Physical Disability'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID physDisCol FIELD ' + row[physDisCol]
		break

	if row[devDisCol] == 'Yes':
		cities[cc]['Subpopulations']['Developmental Disability'][row[groupCol]] += 1
	elif row[devDisCol] == 'No':
		cities[cc]['Subpopulations']['No Developmental Disability'][row[groupCol]] += 1
	elif row[devDisCol] == 'DoesntKnow' or row[devDisCol] == '':
		cities[cc]['Subpopulations']['Unknown Developmental Disability'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID devDisCol FIELD ' + row[devDisCol]
		break

	if row[brainCol] == 'Yes':
		cities[cc]['Subpopulations']['Brain Injury'][row[groupCol]] += 1
	elif row[brainCol] == 'No':
		cities[cc]['Subpopulations']['No Brain Injury'][row[groupCol]] += 1
	elif row[brainCol] == 'DoesntKnow' or row[brainCol] == '':
		cities[cc]['Subpopulations']['Unknown Brain Injury'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID brainCol FIELD ' + row[brainCol]
		break

	if row[domesticCol] == 'Yes':
		cities[cc]['Subpopulations']['Victim of Domestic Violence'][row[groupCol]] += 1
	elif row[domesticCol] == 'No':
		cities[cc]['Subpopulations']['Not Victim of Domestic Violence'][row[groupCol]] += 1
	elif row[domesticCol] == 'DoesntKnow' or row[domesticCol] == '':
		cities[cc]['Subpopulations']['Unknown Victim of Domestic Violence'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID domesticCol FIELD ' + row[domesticCol]
		break

	if row[hivCol] == 'Yes':
		cities[cc]['Subpopulations']['AIDS or HIV'][row[groupCol]] += 1
	elif row[hivCol] == 'No':
		cities[cc]['Subpopulations']['No AIDS or HIV'][row[groupCol]] += 1
	elif row[hivCol] == 'DoesntKnow' or row[hivCol] == '':
		cities[cc]['Subpopulations']['Unknown AIDS or HIV'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID hivCol FIELD ' + row[hivCol]
		break

	if row[jailCol] == 'YesTwelveMonths':
		if row[paroleCol] == 'Probation':
			cities[cc]['Subpopulations']['Jail Release 12 Months: Probation'][row[groupCol]] += 1
		elif row[paroleCol] == 'Parole':
			cities[cc]['Subpopulations']['Jail Release 12 Months: Parole'][row[groupCol]] += 1
		elif row[paroleCol] == 'CompletedSentence':
			cities[cc]['Subpopulations']['Jail Release 12 Months: Completed Sentence'][row[groupCol]] += 1
		elif row[paroleCol] == '':
			cities[cc]['Subpopulations']['Jail Release 12 Months: (Unspecified)'][row[groupCol]] += 1
		else:
			print 'ERROR: INVALID paroleCol FIELD ' + row[paroleCol]
			break
	elif row[jailCol] == 'YesNinetyDays':
		if row[paroleCol] == 'Probation':
			cities[cc]['Subpopulations']['Jail Release 90 Days: Probation'][row[groupCol]] += 1
		elif row[paroleCol] == 'Parole':
			cities[cc]['Subpopulations']['Jail Release 90 Days: Parole'][row[groupCol]] += 1
		elif row[paroleCol] == 'CompletedSentence':
			cities[cc]['Subpopulations']['Jail Release 90 Days: Completed Sentence'][row[groupCol]] += 1
		elif row[paroleCol] == '':
			cities[cc]['Subpopulations']['Jail Release 90 Days: (Unspecified)'][row[groupCol]] += 1
		else:
			print 'ERROR: INVALID paroleCol FIELD ' + row[paroleCol]
			break
	elif row[jailCol] == 'No':
		cities[cc]['Subpopulations']['No Jail'][row[groupCol]] += 1
	elif row[jailCol] == '':
		cities[cc]['Subpopulations']['Unknown Jail'][row[groupCol]] += 1
	else:
		print 'ERROR: INVALID jailCol FIELD ' + row[jailCol]
		break


Catergories = [
	'Race',
	'Ethinicity',
	'Gender',
	'Age',
	'Subpopulations'
]

Titles = {
	'Race': [
		'American Indian',
		'Asian',
		'Black',
		'Native Hawaiian',
		'White',
		'Multiple Races',
		'Unknown Race'
	],
	'Ethinicity': [
		'Hispanic',
		'NonHispanic',
		'Unknown Ethinicity'
	],
	'Gender': [
		'Male',
		'Female',
		'Transgender',
		'Gender Non-Conforming',
		'Unknown Gender'
	],
	'Age': [
		'Adults (>24)',
		'Youth (18-24)',
		'Children (<18)',
		# 'Elderly (62+)',
		'Unknown Age'
	],
	'Subpopulations': [
		'Veteran Yes',
		'Veteran No',
		'Chronically Homeless',
		'Not Chronically Homeless',
		'Substance Abuse',
	    'No Substance Abuse',
	    'Unknown Substance Abuse',
		'PTSD',
		'No PTSD',
		'Unknown PTSD',
		'Mental Health Conditions',
		'No Mental Health Conditions',
		'Unknown Mental Health Conditions',
		'Physical Disability',
		'No Physical Disability',
		'Unknown Physical Disability',
		'Developmental Disability',
		'No Developmental Disability',
		'Unknown Developmental Disability',
		'Brain Injury',
		'No Brain Injury',
		'Unknown Brain Injury',
		'Victim of Domestic Violence',
		'Not Victim of Domestic Violence',
		'Unknown Victim of Domestic Violence',
		'AIDS or HIV',
		'No AIDS or HIV',
		'Unknown AIDS or HIV',
		'Jail Release 90 Days: Probation',
		'Jail Release 90 Days: Parole',
		'Jail Release 90 Days: Completed Sentence',
		'Jail Release 90 Days: (Unspecified)',
		'Jail Release 12 Months: Probation',
		'Jail Release 12 Months: Parole',
		'Jail Release 12 Months: Completed Sentence',
		'Jail Release 12 Months: (Unspecified)',
		'No Jail',
		'Unknown Jail',
	]
}

for x in Catergories:
	for y in Titles[x]:
		cities['RIVERSIDE'][x][y]['Interview'] = cities['RIVERSIDE 1'][x][y]['Interview']  + cities['RIVERSIDE 2'][x][y]['Interview'] 
		cities['RIVERSIDE'][x][y]['Observation'] = cities['RIVERSIDE 1'][x][y]['Observation']  + cities['RIVERSIDE 2'][x][y]['Observation']  

for i in Titles[Catergories[4]]:
	print i,cities['RIVERSIDE']['Subpopulations'][i]
Totals = [0, 0]

out = open('2019citySubPopulations.csv','w')
out.write('District,CityName,Catergory,Subpopulation,Interview,Observation\n')
for x in citynames:
	for y in Catergories:
		Totals = [0,0]
		for z in  Titles[y]: 
			Totals[0] += int(cities[x][y][z]['Interview'])
			Totals[1] += int(cities[x][y][z]['Observation'])
			out.write(str(cities[x]['District']) + ',' + x + ',' + y + ',' + z + ',' + str(cities[x][y][z]['Interview']) + ',' + str(cities[x][y][z]['Observation']) + '\n')
		out.write(str(cities[x]['District']) + ',' + x + ',' + y + ',Total,' + str(Totals[0]) + ',' + str(Totals[1]) + '\n')

out.close()


