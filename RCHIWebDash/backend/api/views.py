from rest_framework import viewsets, permissions, generics
from rest_framework.filters import SearchFilter
from backend.models import Trends, SubpopulationsByCity2019, VolunteerDeployment, SubpopulationsByYear, HouseholdsByCityYearInterview
from .serializers import TrendsSerializer, SubpopulationsByCity2019Serializer, VolunteerDeploymentSerializer, SubpopulationsByYearSerializer ,HouseholdsByCityYearInterviewSerializer
from django.db.models import Q

class HouseholdsByCityYearInterviewViewSet(viewsets.ModelViewSet):
    queryset = HouseholdsByCityYearInterview.objects.all()
    serializer_class = HouseholdsByCityYearInterviewSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']


class SubpopulationsByCity2019ViewSet(viewsets.ModelViewSet):
    serializer_class = SubpopulationsByCity2019Serializer
    filter_backends = [SearchFilter]
    search_fields = ['district','category','subpopulation']

    def get_queryset(self):
        qs = SubpopulationsByCity2019.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            print(query)
            qs = qs.filter(Q(district__icontains=query) | Q(city__icontains=query)).distinct()
        return qs

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
