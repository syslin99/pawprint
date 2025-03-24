from django.urls import path, include
from rest_framework import routers

from .views import EntryViewSet, PictureViewSet


router = routers.DefaultRouter()
router.register(r'entrys', EntryViewSet)
router.register(r'pictures', PictureViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
