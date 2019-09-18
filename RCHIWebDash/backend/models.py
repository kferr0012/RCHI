from django.db import models

class HouseholdsByCityYearInterview(models.Model):
	year = models.IntegerField()
	district = models.IntegerField()
	city = models.CharField(max_length=50)
	totalHouseholds = models.IntegerField()
	adultsOnly = models.IntegerField()
	adultsAndChildren = models.IntegerField()
	childrenOnly = models.IntegerField()

class SubpopulationsByCity2019(models.Model):
	district = models.CharField(max_length=100)
	city = models.CharField(max_length=100)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	interview = models.IntegerField()
	observation = models.IntegerField()

class SubpopulationsByYear(models.Model):
	year = models.IntegerField()
	category = models.CharField(max_length=50)
	subpopulation = models.CharField(max_length=50)
	interview = models.IntegerField()
	observation = models.IntegerField()
	sheltered = models.BooleanField(default=False)

class VolunteerDeployment(models.Model):
	year = models.IntegerField()
	district = models.IntegerField()
	deploymentSite = models.CharField(max_length=50)
	count = models.IntegerField()

#Maybe
class Trends(models.Model):
	year =  models.IntegerField()
	trend = models.CharField(max_length=50)
	category = models.CharField(max_length=50)
	subCategory = models.CharField(max_length=50, blank=True, null=True)
	interview = models.IntegerField()
	observation = models.IntegerField()
	total = models.IntegerField()






