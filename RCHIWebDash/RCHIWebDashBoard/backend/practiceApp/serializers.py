from rest_framework import serializers
from practiceApp.models import PracticeApp

class PracticeAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeApp
        fields = '__all__'