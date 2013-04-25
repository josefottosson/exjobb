from django.shortcuts import get_list_or_404, render, get_object_or_404, render, redirect
from exjobbApp.models import City
from django.utils import simplejson
from django.contrib.csrf.middleware import csrf_exempt
import sys

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponseRedirect

def GetAllCities(request):
  
  	cities = City.objects.all()
  	return HttpResponse(cities.count())

def GetAllCitiesWhere(request):
  
  	cities = City.objects.all().filter(state = "AL")
  	return HttpResponse(cities.count())

def CalculateModulus(request):
	
	numbers = []
	i = 0
	for i in range(10000000):
		if i % 3 == 0:
			numbers.append(i)


	return HttpResponse(len(numbers))