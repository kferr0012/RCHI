from django.urls import path, include
from django.contrib import admin
from .views import TrendsViewSet, SubpopulationsByCity2019ViewSet, VolunteerDeploymentViewSet, SubpopulationByYearViewSet, HouseholdsByCityYearInterviewViewSet,CityTotalByYearViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('Trends', TrendsViewSet, basename='Trends')
#router.register('General', GeneralViewSet, basename='General')
router.register('HouseholdsByCityYearInterview', HouseholdsByCityYearInterviewViewSet,basename='HouseholdsByCityYearInterview')
router.register('SubpopulationsByCity2019',SubpopulationsByCity2019ViewSet, basename='SubpopulationsByCity')
router.register('VolunteerDeployment',VolunteerDeploymentViewSet,basename='VolunteerDeployment')
router.register('SubpopulationsByYear',SubpopulationByYearViewSet,basename='SubpopulationsByYear')
router.register('CityTotalByYear',CityTotalByYearViewSet,basename='CityTotalByYear')




urlpatterns = [
    path('', include(router.urls))
]