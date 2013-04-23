from django.db import models
from django.core.urlresolvers import reverse

from djangotoolbox.fields import ListField, EmbeddedModelField

# Create your models here.
class City(models.Model):
	city = models.TextField()
	loc = models.TextField()
	population = models.IntegerField()
	state = models.TextField()

	def __unicode__(self):
        	return self.city