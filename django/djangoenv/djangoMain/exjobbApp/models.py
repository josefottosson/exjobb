from django.db import models
from django.core.urlresolvers import reverse

from djangotoolbox.fields import ListField, EmbeddedModelField

# Create your models here.
class City(models.Model):
	city = models.CharField()
	loc = models.CharField()
	population = models.IntegerField()
	state = models.CharField()
	id = models.IntegerField()

	class MongoMeta:
		db_table = "cities"

	def __unicode__(self):
        	return self.city