from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Entry, Vitals, Picture
from .serializers import EntrySerializer
from .serializers import VitalsSerializer
from .serializers import PictureSerializer


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

class VitalsViewSet(viewsets.ModelViewSet):
    queryset = Vitals.objects.all()
    serializer_class = VitalsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
