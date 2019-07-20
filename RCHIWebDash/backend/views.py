from django.shortcuts import render
from backend.models import HouseholdsByCity2019, SubpopulationsByCity2019
from backend.serializers import HouseholdsByCity2019Serializer, SubpopulationsByCity2019Serializer
from rest_framework import generics

# from backend.models import PracticeApp, 
# from backend.serializers import PracticeAppSerializer,
# class PracticeAppListCreate(generics.ListCreateAPIView):
#     queryset = PracticeApp.objects.all()
#     serializer_class = PracticeAppSerializer

class HouseholdsByCity2019ListCreate(generics.ListCreateAPIView):
    queryset = HouseholdsByCity2019.objects.all()
    serializer_class = HouseholdsByCity2019Serializer

class SubpopulationsByCity2019ListCreate(generics.ListCreateAPIView):
    queryset = SubpopulationsByCity2019.objects.all()
    serializer_class = SubpopulationsByCity2019Serializer

