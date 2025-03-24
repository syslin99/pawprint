from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Entry, Picture
from .serializers import EntryPolymorphicSerializer, PictureSerializer


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntryPolymorphicSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'pets']

class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
