from django.shortcuts import render

# Create your views here.
# from django.http import HttpResponse


def index(request):
    return render(request, "ASPO_new/index.html")

def home(request):
    return render(request, "ASPO_new/home.html")
