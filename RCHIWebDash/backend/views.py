from django.shortcuts import render
from backend.models import PracticeApp, HouseholdsbyCity2019
from backend.serializers import PracticeAppSerializer, HouseholdsbyCity2019Serializer
from rest_framework import generics

class PracticeAppListCreate(generics.ListCreateAPIView):
    queryset = PracticeApp.objects.all()
    serializer_class = PracticeAppSerializer

class HouseholdsbyCity2019ListCreate(generics.ListCreateAPIView):
    queryset = HouseholdsbyCity2019.objects.all()
    serializer_class = HouseholdsbyCity2019Serializer

