from django.db import models

# Create your models here.
class PracticeApp(models.Model):
	row = models.IntegerField()
	column = models.IntegerField()
	data = models.IntegerField()
	title = models.CharField(max_length=100)

class HouseholdsbyCity2019(models.Model):
	district = models.CharField(max_length=100)
	city = models.CharField(max_length=100)
	totalHouseholds = models.IntegerField()
	adultsOnly = models.IntegerField()
	childrenOnly = models.IntegerField()
	adultsAndChildren = models.IntegerField()