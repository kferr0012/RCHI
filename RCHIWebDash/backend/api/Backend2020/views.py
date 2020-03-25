from rest_framework import viewsets ,permissions, generics
from rest_framework.filters import SearchFilter

from backend.api.Backend2020.models import *
from .serializer import *
from django.db.models import Q

class HouseholdsByCityYearInterviewViewSet(viewsets.ModelViewSet):
    queryset = HouseholdsByCityYearInterview2020.objects.all()
    serializer_class = HouseholdsByCityYearInterviewSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']

class SubpopulationsByCityViewSet(viewsets.ModelViewSet):
    queryset = SubpopulationsByCity2020.objects.all()
    serializer_class = SubpopulationsByCitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['district','category','city','subpopulation']

class SubpopulationByYearViewSet(viewsets.ModelViewSet):
    queryset = SubpopulationsByYear2020.objects.all()
    serializer_class = SubpopulationsByYearSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']

class VolunteerDeploymentViewSet(viewsets.ModelViewSet):
    queryset = VolunteerDeployment2020.objects.all()
    serializer_class = VolunteerDeploymentSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']

class CityTotalByYearViewSet(viewsets.ModelViewSet):
    queryset = CityTotalsByYear2020.objects.all()
    serializer_class = CityTotalsByYearSerializer
    filter_backends = [SearchFilter]
    search_fields = ['district']

class GeneralTableSubpopulationsViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulations2020.objects.all()
    serializer_class = GeneralTableSubpopulationsSerializer
    
    filter_backends = [SearchFilter]

    search_fields = ['category','subpopulation']

class GeneralTableSubpopulationsShelteredViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulationsSheltered2020.objects.all()
    serializer_class = GeneralTableSubpopulationsShelteredSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']

class GeneralTableSubpopulationsTotalCountsViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulationsTotalCounts.objects.all()
    serializer_class = GeneralTableSubpopulationsTotalCountsSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']

class NewlyHomelessByCityViewSet(viewsets.ModelViewSet):
    queryset = NewlyHomelessByCity.objects.all()
    serializer_class = NewlyHomelessByCitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['district','category','city','subpopulation']

class SeniorsSubpopulationsViewSet(viewsets.ModelViewSet):
    queryset =  SeniorsSubpopulationTotalCounts.objects.all()
    serializer_class = SeniorsSubpopulationsSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']
