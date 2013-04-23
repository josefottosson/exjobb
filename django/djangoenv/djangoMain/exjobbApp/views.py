from django.shortcuts import get_list_or_404, render, get_object_or_404, render, redirect
from exjobbApp.models import City
from django.utils import simplejson
from django.contrib.csrf.middleware import csrf_exempt
import sys

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponseRedirect

def GetAllCities(request):
  
  	cities = City.objects.all()
  	return HttpResponse(len(cities))
GetAllCities = csrf_exempt(GetAllCities)

def GetAllCitiesWhere(request):
  
  	cities = City.objects.all().filter(state = "AL")
  	return HttpResponse(len(cities))
GetAllCitiesWhere = csrf_exempt(GetAllCitiesWhere)