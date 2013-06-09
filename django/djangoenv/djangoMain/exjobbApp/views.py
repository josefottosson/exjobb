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
	# Loops 10 million times
	for i in range(10000000):
		if i % 3 == 0:
			numbers.append(i)

	numbers = []
	return HttpResponse('Modulus Done')

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
	# Selects all cities with a population less than 10 000
	for city in City.objects.all().filter(population__lt=10000):
		if city.city == city.city.upper():
			city.city = city.city.lower()
		else:
			city.city = city.city.upper()

		city.save(city)
	return HttpResponse('Select and update done')

def Test(request):

	return HttpResponse("Tests done")
