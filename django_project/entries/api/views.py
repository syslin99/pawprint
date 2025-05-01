from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Entry, Picture
from .serializers import EntryListRetrievePolymorphicSerializer, EntryCreateUpdatePolymorphicSerializer, PictureSerializer


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntryListRetrievePolymorphicSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'pets']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EntryCreateUpdatePolymorphicSerializer
        return super().get_serializer_class()


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
