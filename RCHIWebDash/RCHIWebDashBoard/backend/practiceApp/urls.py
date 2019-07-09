from django.urls import path
from . import views

urlpatterns = [
    path('api/practiceApp/', views.PracticeAppListCreate.as_view() ),
]