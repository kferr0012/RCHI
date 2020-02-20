from django.urls import path, include
from django.contrib import admin
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('HouseholdsByCityYearInterview', HouseholdsByCityYearInterviewViewSet,basename='HouseholdsByCityYearInterview')
router.register('SubpopulationsByCity',SubpopulationsByCityViewSet, basename='SubpopulationsByCity')
router.register('VolunteerDeployment',VolunteerDeploymentViewSet,basename='VolunteerDeployment')
router.register('SubpopulationsByYear',SubpopulationsByYearViewSet,basename='SubpopulationsByYear')
router.register('CityTotalByYear',CityTotalByYearViewSet,basename='CityTotalByYear')
router.register('GeneralTableSubpopulations',GeneralTableSubpopulationsViewSet, basename = "GeneralTableSubpopulations2019")
router.register('GeneralTableSubpopulationsSheltered', GeneralTableSubpopulationsShelteredViewSet, basename = "GeneralTableSubpopulationsSheltered2019")
router.register('Trends', TrendsViewSet, basename='Trends2019')

urlpatterns = [
    path('2019/', include(router.urls)),
    path('', include(router.urls))
]