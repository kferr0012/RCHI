from rest_framework import viewsets, permissions, generics
from rest_framework.filters import SearchFilter

#from django_filters.rest_framework import DjangoFilterBackend


from .models import *
from .serializers import *
from django.db.models import Q

class HouseholdsByCityYearInterviewViewSet(viewsets.ModelViewSet):
    queryset = HouseholdsByCityYearInterview2019.objects.all()
    serializer_class = HouseholdsByCityYearInterviewSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']


class SubpopulationsByCityViewSet(viewsets.ModelViewSet):
    queryset = SubpopulationsByCity2019.objects.all()
    serializer_class = SubpopulationsByCitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['district','category','city','subpopulation']


class SubpopulationsByYearViewSet(viewsets.ModelViewSet):
    queryset = SubpopulationsByYear2019.objects.all()
    serializer_class = SubpopulationsByYearSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']

class VolunteerDeploymentViewSet(viewsets.ModelViewSet):
    queryset = VolunteerDeployment2019.objects.all()
    serializer_class = VolunteerDeploymentSerializer
    filter_backends = [SearchFilter]

    search_fields = ['district']

class CityTotalByYearViewSet(viewsets.ModelViewSet):
    queryset = CityTotalsByYear2019.objects.all()
    serializer_class = CityTotalsByYearSerializer
    filter_backends = [SearchFilter]
    search_fields = ['district', 'year']


class GeneralTableSubpopulationsViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulations2019.objects.all()
    serializer_class = GeneralTableSubpopulationsSerializer
    
    #filter_backends = [DjangoFilterBackend]
    filter_backends = [SearchFilter]
    #filterset_fields = ['subpopulation', 'category']

    search_fields = ['category','subpopulation']

class GeneralTableSubpopulationsShelteredViewSet(viewsets.ModelViewSet):
    queryset = GeneralTableSubpopulationsSheltered2019.objects.all()
    serializer_class = GeneralTableSubpopulationsShelteredSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category', 'subpopulation']


class TrendsViewSet(viewsets.ModelViewSet):
    # queryset = Trends.objects.all()
    serializer_class = TrendsSerializer
    filter_backends = [SearchFilter]
    search_fields = ['category','year','subCategory']
    
    def get_queryset(self):
        qs = Trends2019.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            print(query)
            qs = qs.filter(Q(year__icontains=query) | Q(category__icontains=query)).distinct()
        return qs