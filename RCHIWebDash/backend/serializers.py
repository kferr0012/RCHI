from rest_framework import serializers
from backend.models import HouseholdsByCity2019, SubpopulationsByCity2019

# from backend.models import PracticeApp,
# class PracticeAppSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PracticeApp
#         fields = '__all__'

class HouseholdsByCity2019Serializer(serializers.ModelSerializer):
    class Meta:
        model = HouseholdsByCity2019
        fields = '__all__'

class SubpopulationsByCity2019Serializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByCity2019
        fields = '__all__'