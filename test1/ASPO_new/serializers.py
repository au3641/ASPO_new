from .models import *
from rest_framework import serializers

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ('pk', 'name', 'introText', 'consentQuestionText', 'consentAcceptText', 'consentRefuseText', 'consentShowOrder')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('pk', 'questionnaire', 'text', 'order', 'type')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('pk', 'question', 'text', 'order')

class DisableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disable
        fields = ('pk', 'question', 'requiredAnswers')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'answeredWith')

class AnswerWeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerWeight
        fields = ('pk', 'answer', 'type', 'value')