from django.urls import path, include
from rest_framework import routers

from .views import EntryViewSet
from .views import VitalsViewSet
from .views import PictureViewSet


router = routers.DefaultRouter()
router.register(r'entrys', EntryViewSet)
router.register(r'vitals', VitalsViewSet)
router.register(r'pictures', PictureViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
