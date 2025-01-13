from django.urls import path, include
from rest_framework import routers

from .views import CaretakerViewSet


router = routers.DefaultRouter()
router.register(r'caretakers', CaretakerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]