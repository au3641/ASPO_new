from .models import *
from rest_framework import serializers

class QuestionnaireSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ('name', 'introText')

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ('questionnaire', 'text', 'idGroup')

class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Answer
        fields = ('question', 'text', 'type', 'order')

class DisableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Disable
        fields = ('question', 'requiredAnswers')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('answeredWith')

class AnswerWeightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Answer
        fields = ('answer', 'type', 'value')