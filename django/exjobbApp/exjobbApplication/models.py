from django.db import models
from django.core.urlresolvers import reverse
from djangotoolbox.fields import ListField, EmbeddedModelField
from mongoengine import connect
from mongoengine import *
connect('exjobb')

class City(Document):
    city = StringField()
    loc = ListField()
    population = IntField()
    state = StringField()
    _id = IntField()

    def __unicode__(self):
        return self.city