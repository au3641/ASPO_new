"""
from .models import QuestionsOld
from rest_framework import serializers

class QuestionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = QuestionsOld
        fields = ('question_id', 'text', 'order_nr', 'type')
"""