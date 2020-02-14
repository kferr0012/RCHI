from rest_framework import serializers
from .models import *

class HouseholdsByCityYearInterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseholdsByCityYearInterview2019
        fields = '__all__'

class SubpopulationsByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByCity2019
        fields = '__all__'

class SubpopulationsByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByYear2019
        fields = '__all__'

class VolunteerDeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerDeployment2019
        fields = '__all__'

class CityTotalsByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityTotalsByYear2019
        fields = '__all__'

class GeneralTableSubpopulationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTableSubpopulations2019
        fields = '__all__'

class GeneralTableSubpopulationsShelteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTableSubpopulationsSheltered2019
        fields = '__all__'