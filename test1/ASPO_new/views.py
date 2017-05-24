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
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import detail_route

# Returns info about ASPO questionnaire
class QuestionnaireASPO(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.filter(name__exact='ASPO')
    serializer_class = QuestionnaireSerializer

# Returns every question in ASPO questionnaire
class QuestionSetASPO(viewsets.ModelViewSet):
    queryset = Question.objects.filter(questionnaire__name='ASPO')
    serializer_class = QuestionSerializer

# Returns all the posible answers for ASPO question set
class AnswerSetForASPO(viewsets.ModelViewSet):
    queryset = Answer.objects.filter(question__questionnaire__name='ASPO')
    serializer_class = AnswerSerializer

# Returns answer weights for ASPO question set
class AnswerWeightForASPO(viewsets.ModelViewSet):
    queryset = AnswerWeight.objects.filter(answer__question__questionnaire__name='ASPO')
    serializer_class = AnswerWeightSerializer

# Returns disables for ASPO question set
class DisableForASPO(viewsets.ModelViewSet):
    queryset = Disable.objects.filter(question__questionnaire__name='ASPO')
    serializer_class = DisableSerializer

class SendAnswersASPO(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @detail_route(methods=['post'])
    def add_useranswers(self, request, pk=None):
        ans = self.get_object()
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            ans.add_useranswers(serializer.data['answeredWith'])
            ans.save()
            return Response({"status":"fok yea"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #return