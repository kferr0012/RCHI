from rest_framework import viewsets, permissions, generics
from rest_framework.filters import SearchFilter
from backend.models import *
from .serializers import *
from django.db.models import Q

class HouseholdsByCityYearInterviewViewSet(viewsets.ModelViewSet):
    queryset = HouseholdsByCityYearInterview.objects.all()
    serializer_class = HouseholdsByCityYearInterviewSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']


class SubpopulationsByCity2019ViewSet(viewsets.ModelViewSet):
    queryset = SubpopulationsByCity2019.objects.all()
    serializer_class = SubpopulationsByCity2019Serializer
    filter_backends = [SearchFilter]
    search_fields = ['district','category','subpopulation']


class SubpopulationByYearViewSet(viewsets.ModelViewSet):
    queryset = SubpopulationsByYear.objects.all()
    serializer_class = SubpopulationsByYearSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']

class VolunteerDeploymentViewSet(viewsets.ModelViewSet):
    queryset = VolunteerDeployment.objects.all()
    serializer_class = VolunteerDeploymentSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']

class CityTotalByYearViewSet(viewsets.ModelViewSet):
    queryset = CityTotalsByYear.objects.all()
    serializer_class = CityTotalsByYearSerializer
    filter_backends = [SearchFilter]
    search_fields = ['district']

#Maybe
class TrendsViewSet(viewsets.ModelViewSet):
    # queryset = Trends.objects.all()
    serializer_class = TrendsSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category','year','subCategory']
    
    def get_queryset(self):
        qs = Trends.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            print(query)
            qs = qs.filter(Q(year__icontains=query) | Q(category__icontains=query)).distinct()
        return qs

# class GeneralViewSet(viewsets.ModelViewSet):
#     serializer_class = GeneralSerializer
#     filter_backends = [SearchFilter]
#     search_fields = ['category','year','shelterType','subCategory']

class GeneralTableSubpopulations2019ViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulations2019.objects.all()
    serializer_class = GeneralTableSubpopulations2019Serializer
    filter_backends = [SearchFilter]
    search_fields = ['category','subpopulation']

class GeneralTableSubpopulationsSheltered2019ViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulationsSheltered2019.objects.all()
    serializer_class = GeneralTableSubpopulationsSheltered2019Serializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']