from django.shortcuts import get_list_or_404, render, get_object_or_404, render, redirect
from exjobbApp.models import City
from django.utils import simplejson
import sys

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponseRedirect

def GetAllCities(request):
  
  	cities = City.objects.all()
  	return HttpResponse(cities)
