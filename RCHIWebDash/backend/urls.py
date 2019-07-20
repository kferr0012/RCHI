from django.urls import path
from . import views

urlpatterns = [
    # path('api/practiceApp/', views.PracticeAppListCreate.as_view() ),
    path('api/HouseholdsByCity2019/', views.HouseholdsByCity2019ListCreate.as_view() ),
    path('api/SubpopulationsByCity2019/', views.SubpopulationsByCity2019ListCreate.as_view() ),
]