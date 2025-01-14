from django.db import models

from contacts.models import Contact


class Pet(models.Model):
    """Represents pets tracked via the app"""
    class Meta:
        ordering = ['id']

    MALE = 'M'
    FEMALE = 'F'
    SEX_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]

    name = models.CharField(max_length=30)
    birthdate = models.DateField(null=True, blank=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    breed = models.CharField(max_length=50, blank=True)
    chip = models.CharField(max_length=15, blank=True)
    image = models.ImageField(upload_to='pets/')
    contacts = models.ManyToManyField(Contact, blank=True, related_name='pets')

    def __str__(self):
        return self.name
