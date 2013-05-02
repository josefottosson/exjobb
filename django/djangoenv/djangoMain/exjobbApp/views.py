from django.shortcuts import get_list_or_404, render, get_object_or_404, render, redirect
from exjobbApp.models import City
from django.utils import simplejson
from django.contrib.csrf.middleware import csrf_exempt
from django.core.files.base import ContentFile
from django.utils import simplejson
import sys
import json
from django.core import serializers

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponseRedirect

def GetAllCities(request):
  	#This is way faster than doing serialization, 2 times faster!!
  	dictionaries = [ obj.as_dict() for obj in City.objects.all() ]
	return HttpResponse(json.dumps({"Cities": dictionaries}), content_type='application/json')

def GetAllCitiesWhere(request):
  
  	dictionaries = [ obj.as_dict() for obj in City.objects.all().filter(state = "AL") ]
	return HttpResponse(json.dumps({"Cities": dictionaries}), content_type='application/json')

def CalculateModulus(request):
	
	numbers = []
	i = 0
	for i in range(10000000):
		if i % 3 == 0:
			numbers.append(i)

	return HttpResponse(len(numbers))

def ReadFile(request):
	fileHandle = open('exjobb.json', 'r+')
	text = fileHandle.read()
	return HttpResponse("File read done")

def ReadAndSaveNew(request):
	fileHandle = open('exjobb.json', 'r+')
	text = fileHandle.read()
	text = text.replace('_id', 'id')
	newFile = open('exjobb2.json', 'w')
	newFile.write(text)
	newFile.close()
	return HttpResponse('Read and Save done')

def SelectAndUpdate(request):
	cities = City.objects.all().filter(population__lte=10000)
	for city in cities:
		if city.city == city.city.upper():
			city.city = city.city.lower()
			city.save(city)
		else:
			city.city = city.city.upper()
			city.save(city)
	return HttpResponse('Select and update done')