from django.shortcuts import get_list_or_404, render, get_object_or_404, render, redirect, HttpResponse
from exjobbApplication.models import City

# Create your views here.
def home(request):
	return render(request, "home/index.html")

def GetAllCities(request):
	cities = City.objects.all
	return HttpResponse('Dunno...')