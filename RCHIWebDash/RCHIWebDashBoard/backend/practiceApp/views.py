from practiceApp.models import PracticeApp
from practiceApp.serializers import PracticeAppSerializer
from rest_framework import generics

class PracticeAppListCreate(generics.ListCreateAPIView):
    queryset = PracticeApp.objects.all()
    serializer_class = PracticeAppSerializer