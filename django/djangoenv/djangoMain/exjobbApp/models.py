from django.db import models
from django.core.urlresolvers import reverse

from djangotoolbox.fields import ListField, EmbeddedModelField

# Create your models here.
class City(models.Model):
	city = models.CharField()
	loc = models.CharField()
	population = models.IntegerField()
	state = models.CharField()
	_id = models.CharField()
	def as_dict(self):
        	return {
            	"id": self.id,
            	"city": self.city,
            	"loc": self.loc,
            	"population": self.population,
            	"state": self.state
            	# other stuff
        	}

	class MongoMeta:
		db_table = "cities"

	def __unicode__(self):
        	return self.city