from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Caretaker
from .serializers import CaretakerSerializer


class CaretakerViewSet(viewsets.ModelViewSet):
    queryset = Caretaker.objects.all()
    serializer_class = CaretakerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
