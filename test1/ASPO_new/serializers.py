from .models import Questions
from rest_framework import serializers

class QuestionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Questions
        fields = ('question_id', 'text', 'order_nr', 'type')