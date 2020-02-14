from django.urls import path, include
from django.contrib import admin
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('HouseholdsByCityYearInterview', HouseholdsByCityYearInterviewViewSet,basename='HouseholdsByCityYearInterview')
router.register('SubpopulationsByCity',SubpopulationsByCityViewSet, basename='SubpopulationsByCity')
router.register('VolunteerDeployment',VolunteerDeploymentViewSet,basename='VolunteerDeployment')
router.register('SubpopulationsByYear',SubpopulationByYearViewSet,basename='SubpopulationsByYear')
router.register('CityTotalByYear',CityTotalByYearViewSet,basename='CityTotalByYear')
router.register('GeneralTableSubpopulations',GeneralTableSubpopulationsViewSet, basename = "GeneralTableSubpopulations")
router.register('GeneralTableSubpopulationsSheltered', GeneralTableSubpopulationsShelteredViewSet, basename = "GeneralTableSubpopulationsSheltered")
urlpatterns = [
    path('2020/', include(router.urls))
]