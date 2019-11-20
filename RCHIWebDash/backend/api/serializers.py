from rest_framework import serializers
from backend.models import *

class HouseholdsByCityYearInterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseholdsByCityYearInterview
        fields = '__all__'

class SubpopulationsByCity2019Serializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByCity2019
        fields = '__all__'

class SubpopulationsByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByYear
        fields = '__all__'

class VolunteerDeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerDeployment
        fields = '__all__'


class  TrendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trends
        fields = '__all__'

class CityTotalsByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityTotalsByYear
        fields = '__all__'

# class GeneralSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeneralCount
#         fields = '__all__'
class GeneralTableSubpopulations2019Serializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTableSubpopulations2019
        fields = '__all__'

class GeneralTableSubpopulationsSheltered2019Serializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTableSubpopulationsSheltered2019
        fields = '__all__'