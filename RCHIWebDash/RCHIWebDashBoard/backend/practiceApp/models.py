from django.db import models

# Create your models here.

class PracticeApp(models.Model):
	row = models.IntegerField()
	column = models.IntegerField()
	data = models.IntegerField()
	title = models.CharField(max_length=100)