from rest_framework import serializers
from backend.models import PracticeApp, HouseholdsbyCity2019

class PracticeAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeApp
        fields = '__all__'

class HouseholdsbyCity2019Serializer(serializers.ModelSerializer):
    class Meta:
        model = HouseholdsbyCity2019
        fields = '__all__'