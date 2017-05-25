from django.shortcuts import render
from django.views.generic.base import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import get_object_or_404
import re


# Create your views here.
# from django.http import HttpResponse

class AspoIndexRedirect(RedirectView):
    permanent = False
    #query_string = True
    pattern_name = '/'

    def get_redirect_url(self, *args, **kwargs):
        #return settings.STATIC_ROOT + "ASPO_new/app/pages/index.html"
        aspo_index = get_object_or_404(settings.STATIC_ROOT + "ASPO_new/app/pages/index.html")
        aspo_index.update_counter()
        return super(AspoIndexRedirect, self).get_redirect_url(*args, **kwargs)

# Index/home page
def index(request):
    return render(request, "ASPO_new/app/pages/index.html")

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
            return Response({"status":"success"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #return