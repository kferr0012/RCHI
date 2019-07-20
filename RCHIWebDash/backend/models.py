from django.db import models

# Create your models here.
# class PracticeApp(models.Model):
# 	row = models.IntegerField()
# 	column = models.IntegerField()
# 	data = models.IntegerField()
# 	title = models.CharField(max_length=100)

class HouseholdsByCity2019(models.Model):
	district = models.CharField(max_length=100)
	city = models.CharField(max_length=100)
	totalHouseholds = models.IntegerField()
	adultsOnly = models.IntegerField()
	childrenOnly = models.IntegerField()
	adultsAndChildren = models.IntegerField()

class SubpopulationsByCity2019(models.Model):
	district = models.CharField(max_length=100)
	city = models.CharField(max_length=100)
	category = models.CharField(max_length=100)
	subpopulation = models.CharField(max_length=100)
	interview = models.IntegerField()
	observation = models.IntegerField()