from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'djangoMain.views.home', name='home'),
    # url(r'^djangoMain/', include('djangoMain.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    url(r'^GetAllCities/$', 'exjobbApp.views.GetAllCities', name="GetAllCities"),
    url(r'^GetAllCitiesWhere/$', 'exjobbApp.views.GetAllCitiesWhere', name="GetAllCitiesWhere"),
    url(r'^CalculateModulus/$', 'exjobbApp.views.CalculateModulus', name="CalculateModulus"),
    url(r'^ReadFile/$', 'exjobbApp.views.ReadFile', name="ReadFile"),
    url(r'^ReadAndSaveNew/$', 'exjobbApp.views.ReadAndSaveNew', name="ReadAndSaveNew"),
    url(r'^SelectAndUpdate/$', 'exjobbApp.views.SelectAndUpdate', name="SelectAndUpdate"),
)
