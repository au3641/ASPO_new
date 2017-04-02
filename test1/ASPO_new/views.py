from django.shortcuts import render
import re

# Create your views here.
# from django.http import HttpResponse


def index(request):
    #print(str(request.path))
    return render(request, "ASPO_new/index.html")
"""
def home(request):
    return render(request, "ASPO_new/home.html")

def menu(request):
    return render(request, "ASPO_new/menu.html")

def footer(request):
    return render(request, "ASPO_new/footer.html")
"""
def any(request):
    # single occurence regex ^([^/]*/[^/]*)/ (ALEN OP)
    # alternative method is just do string split (meh)
    subUrl = re.sub( r'^([^/]*/[^/]*)/', "", str(request.path))
    return render(request, subUrl)


# REST FROM HERE ON OUT

from .models import Questions
from .serializers import QuestionSerializer
from rest_framework import viewsets

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects.using('aspo_db').all()
    serializer_class = QuestionSerializer