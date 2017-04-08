from django.shortcuts import render
import re

# Create your views here.
# from django.http import HttpResponse


# Index/home page
def index(request):
    return render(request, "ASPO_new/index.html")

# Regex handler for static pages
def any(request):
    # single occurence regex ^([^/]*/[^/]*)/ (ALEN OP)
    # Filters app name from url path
    subUrl = re.sub( r'^([^/]*/[^/]*)/', "", str(request.path))
    return render(request, subUrl)



# REST HANDLERS FROM HERE ON OUT

from .models import *
from .serializers import *
from rest_framework import viewsets

# Returns info about ASPO questionnaire
class QuestionnaireASPO(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.using('aspo_new_db').filter(name__exact='ASPO')
    serializer_class = QuestionnaireSerializer

# Returns every question in ASPO questionnaire
class QuestionSetASPO(viewsets.ModelViewSet):
    queryset = Question.objects.using('aspo_new_db').filter(questionnaire__name='ASPO')
    serializer_class = QuestionSerializer

# Returns all the posible answers for ASPO question set
class AnswerSetForASPO(viewsets.ModelViewSet):
    queryset = Answer.objects.using('aspo_new_db').filter(question__questionnaire__name='ASPO')
    serializer_class = AnswerSerializer

# Returns answer weights for ASPO question set
class AnswerWeightForASPO(viewsets.ModelViewSet):
    queryset = AnswerWeight.objects.using('aspo_new_db').filter(answer__question__questionnaire__name='ASPO')
    serializer_class = AnswerWeightSerializer

# Returns disables for ASPO question set
class DisableForASPO(viewsets.ModelViewSet):
    queryset = Disable.objects.using('aspo_new_db').filter(question__questionnaire__name='ASPO')
    serializer_class = DisableSerializer