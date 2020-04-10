from django.db import models

class HouseholdsByCityYearInterview2020(models.Model):
	year = models.IntegerField()
	district = models.IntegerField()
	city = models.CharField(max_length=50)
	totalHouseholds = models.IntegerField()
	adultsOnly = models.IntegerField()
	adultsAndChildren = models.IntegerField()
	childrenOnly = models.IntegerField()
	_type = models.CharField(max_length=50)

class SubpopulationsByCity2020(models.Model):
	district = models.CharField(max_length=100)
	city = models.CharField(max_length=100)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	interview = models.IntegerField()
	observation = models.IntegerField()
	total = models.IntegerField()
	_type = models.CharField(max_length=50)
	year = models.IntegerField()

class SubpopulationsByYear2020(models.Model):
	year = models.IntegerField()
	category = models.CharField(max_length=50)
	subpopulation = models.CharField(max_length=50)
	interview = models.IntegerField()
	observation = models.IntegerField()
	sheltered = models.BooleanField(default=False)
	total = models.IntegerField()
	_type = models.CharField(max_length=50)

class VolunteerDeployment2020(models.Model):
	year = models.IntegerField()
	district = models.IntegerField()
	deploymentSite = models.CharField(max_length=50)
	count = models.IntegerField()
	_type = models.CharField(max_length=50)
	category = models.CharField(max_length=50)

class CityTotalsByYear2020(models.Model):
	year = models.IntegerField()
	district = models.IntegerField()
	sheltered = models.BooleanField(default=False)
	city = models.CharField(max_length=100)
	total = models.IntegerField()
	volunteers = models.CharField(max_length=50)
	_type = models.CharField(max_length=50)

class GeneralTableSubpopulations2020(models.Model):
	id = models.CharField(max_length = 100, primary_key = True)
	year = models.IntegerField()
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	interview = models.IntegerField()
	observation = models.IntegerField()
	total = models.IntegerField()
	_type = models.CharField(max_length=50)


class GeneralTableSubpopulationsSheltered2020(models.Model):
	id = models.CharField(max_length = 100, primary_key = True)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	total = models.IntegerField()
	interview = models.IntegerField()
	observation = models.IntegerField()
	_type = models.CharField(max_length=50)
	year = models.IntegerField()

class GeneralTableSubpopulationsTotalCounts(models.Model):
	id = models.CharField(max_length = 100, primary_key = True)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	total = models.IntegerField()
	interview = models.IntegerField()
	observation = models.IntegerField()
	_type = models.CharField(max_length=50)
	year = models.IntegerField()

class NewlyHomelessByCity(models.Model):
	district = models.CharField(max_length=100)
	city = models.CharField(max_length=100)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	interview = models.IntegerField()
	observation = models.IntegerField()
	total = models.IntegerField()
	year = models.IntegerField()
	_type = models.CharField(max_length=50)

class SeniorsSubpopulationTotalCounts2020(models.Model):
	id = models.CharField(max_length = 100, primary_key=True)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	interview = models.IntegerField()
	observation = models.IntegerField()
	total = models.IntegerField()
	year = models.IntegerField()
	_type = models.CharField(max_length=50)
