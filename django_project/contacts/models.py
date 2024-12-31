from django.db import models

from phonenumber_field.modelfields import PhoneNumberField
from address.models import AddressField


class Contact(models.Model):
    """Represents contact information for non-caretakers relevant to pet care"""
    class Meta:
        ordering = ['id']

    name = models.CharField(max_length=70)
    role = models.CharField(max_length=40, blank=True)
    organization = models.CharField(max_length=50, blank=True)
    phone = PhoneNumberField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    address = AddressField(null=True, blank=True)

    def __str__(self):
        return self.name
