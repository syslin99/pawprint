from django.db import models

from pets.models import Pet
from contacts.models import Contact


class Caretaker(models.Model):
    """Represents users of the app"""
    class Meta:
        ordering = ['id']

    name = models.CharField(max_length=30)
    email = models.EmailField()
    password = models.CharField(max_length=40)
    pets = models.ManyToManyField(Pet, blank=True, related_name='caretakers')
    contacts = models.ManyToManyField(Contact, blank=True, related_name='caretakers')

    def __str__(self):
        return self.name
