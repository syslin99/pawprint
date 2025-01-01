from django.db import models

from caretakers.models import Caretaker
from pets.models import Pet


class Category(models.Model):
    """Categorizes entry kinds"""
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=30, unique=True)

    def get_default_id():
        category, created = Category.objects.get_or_create(name='Other')
        return category.id

    def __str__(self):
        return self.name

class Kind(models.Model):
    """Categorizes entries"""
    class Meta:
        ordering = ['name']

    name = models.CharField(max_length=30, unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT, default=Category.get_default_id, related_name='kinds')

    def get_default_id():
        kind, created = Kind.objects.get_or_create(name='Other')
        return kind.id

    def __str__(self):
        return self.name

class Entry(models.Model):
    """Represents entries of pet care tasks, events, etc."""
    class Meta:
        ordering = ['id']

    title = models.CharField(max_length=50, blank=True)
    kind = models.ForeignKey(Kind, on_delete=models.SET_DEFAULT, default=Kind.get_default_id, related_name='entries')
    recorded_on = models.DateTimeField('date recorded')
    caretakers = models.ManyToManyField(Caretaker, related_name='entries')
    pets = models.ManyToManyField(Pet, related_name='entries')
    notes = models.CharField(max_length=500, blank=True)
    is_event = models.BooleanField('is event?', default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """Overrides save behavior. Sets title to kind name if left blank."""
        if not self.title:
            self.title = self.kind.name
        super().save(*args, **kwargs)

class Vitals(models.Model):
    """Contains additional vitals information associated with entries"""
    class Meta:
        ordering = ['id']

    WEIGHT_UNITS = 'lbs'
    TEMPERATURE_UNITS = '°F'
    HR_UNITS = 'bpm'
    RR_UNITS = 'breaths/min'
    UNIT_CHOICES = [
        (WEIGHT_UNITS, 'lbs'),
        (TEMPERATURE_UNITS, '°F'),
        (HR_UNITS, 'bpm'),
        (RR_UNITS, 'breaths/min'),
    ]

    entry = models.OneToOneField(Entry, on_delete=models.CASCADE)
    measurement = models.DecimalField(max_digits=4, decimal_places=1)
    unit = models.CharField(max_length=11, choices=UNIT_CHOICES)

    def __str__(self):
        return self.entry.title

class Picture(models.Model):
    """Contains additioanl pictures associated with entries"""
    class Meta:
        ordering = ['id']

    entry = models.ForeignKey(Entry, on_delete=models.CASCADE, related_name='pictures')
    image = models.ImageField(upload_to='entries/images')

    def __str__(self):
        return self.entry.title
