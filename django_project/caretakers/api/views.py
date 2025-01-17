from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Caretaker
from .serializers import CaretakerSerializer
from pets.models import Pet
from pets.api.serializers import PetSerializer
from contacts.models import Contact
from contacts.api.serializers import ContactSerializer


class CaretakerViewSet(viewsets.ModelViewSet):
    queryset = Caretaker.objects.all()
    serializer_class = CaretakerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

class CaretakerPetsViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer

    def get_queryset(self):
        return Pet.objects.filter(caretakers__in=self.kwargs['caretaker_pk'])

class CaretakerContactsViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(caretakers__in=self.kwargs['caretaker_pk'])
