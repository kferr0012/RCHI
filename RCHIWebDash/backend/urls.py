from django.urls import path
from . import views

urlpatterns = [
    path('api/practiceApp/', views.PracticeAppListCreate.as_view() ),
    path('api/HouseholdsbyCity2019/', views.HouseholdsbyCity2019ListCreate.as_view() ),
]