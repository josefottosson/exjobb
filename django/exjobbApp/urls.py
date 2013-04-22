from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^home/$', 'exjobbApplication.views.home', name="home"),
    url(r'^GetAllCities/$', 'exjobbApplication.views.GetAllCities', name="GetAllCities"),
    # url(r'^exjobbApp/', include('exjobbApp.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
